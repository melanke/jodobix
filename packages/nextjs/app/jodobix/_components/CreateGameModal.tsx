"use client";

import React, { useEffect, useState } from "react";
import { AddressInputList } from "./AddressInputList";
import { Abi, parseEther, parseEventLogs } from "viem";
import { useAccount } from "wagmi";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { EtherInput, IntegerInput, IntegerVariant } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (gameId: bigint) => void;
}

export const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose, onCreated }) => {
  const { address } = useAccount();
  const [bettingPeriodBlocks, setBettingPeriodBlocks] = useState("");
  const [minBetValue, setMinBetValue] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  const { data: jodobixContractInfo } = useDeployedContractInfo("Jodobix");
  const { writeContractAsync } = useScaffoldWriteContract("Jodobix");

  useEffect(() => {
    // participants only starts [], if the address is erased the participants become [""], so we are not forcing it to be [address]
    if (address && participants.length === 0) {
      setParticipants([address, ""]);
    }
  }, [address, participants.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const participantsList = participants.filter(p => p.trim());

      await writeContractAsync(
        {
          functionName: "createPrivateGame",
          args: [BigInt(bettingPeriodBlocks || "0"), parseEther(minBetValue), participantsList],
        },
        {
          onBlockConfirmation: receipt => {
            const [gameCreatedEvent] = parseEventLogs({
              abi: jodobixContractInfo?.abi as Abi,
              eventName: "GameCreated",
              logs: receipt.logs,
            });

            if (gameCreatedEvent && "gameId" in gameCreatedEvent.args) {
              const gameId = gameCreatedEvent.args.gameId as bigint;
              onCreated?.(gameId);
            }
          },
        },
      );

      handleClose();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleClose = () => {
    setBettingPeriodBlocks("");
    setMinBetValue("");
    setParticipants(address ? [address, ""] : [""]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 font-encode-sans">Create New Game</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                Betting Period
                <div
                  className="tooltip tooltip-secondary tooltip-right"
                  data-tip="How much time the game will be open for bets. Each block takes around 12 seconds, so 300 blocks is around 1 hour"
                >
                  <InformationCircleIcon className="h-4 w-4 text-base-content/60" />
                </div>
              </span>
            </label>
            <IntegerInput
              value={bettingPeriodBlocks}
              onChange={setBettingPeriodBlocks}
              placeholder="Number of blocks"
              variant={IntegerVariant.UINT256}
              disableMultiplyBy1e18={true}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                Min Bet Value
                <div
                  className="tooltip tooltip-secondary tooltip-right"
                  data-tip="The minimum amount of ETH that can be bet on the game"
                >
                  <InformationCircleIcon className="h-4 w-4 text-base-content/60" />
                </div>
              </span>
            </label>
            <EtherInput value={minBetValue} onChange={setMinBetValue} />
          </div>

          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                Participants
                <div
                  className="tooltip tooltip-secondary tooltip-right"
                  data-tip="Only selected participants will be able to bet"
                >
                  <InformationCircleIcon className="h-4 w-4 text-base-content/60" />
                </div>
              </span>
            </label>
            <AddressInputList addresses={participants} onChange={setParticipants} />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
