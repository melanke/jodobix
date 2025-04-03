import React from "react";
import { Abi, parseEther, parseEventLogs } from "viem";
import { EtherInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface BetFormProps {
  gameId?: bigint;
  selectedNumber: number | null;
  onBetPlaced?: (betId: bigint) => void;
  betAmount: string;
  setBetAmount: (value: string) => void;
}

export const BetForm: React.FC<BetFormProps> = ({ gameId, selectedNumber, onBetPlaced, betAmount, setBetAmount }) => {
  const { data: critterContractInfo } = useDeployedContractInfo("Critter");
  const { writeContractAsync } = useScaffoldWriteContract("Critter");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await writeContractAsync(
        {
          functionName: "placeBet",
          args: [gameId, Number(selectedNumber)],
          value: parseEther(betAmount),
        },
        {
          onBlockConfirmation: receipt => {
            const [betPlacedEvent] = parseEventLogs({
              abi: critterContractInfo?.abi as Abi,
              eventName: "BetPlaced",
              logs: receipt.logs,
            });

            if (betPlacedEvent && "betId" in betPlacedEvent.args) {
              const betId = betPlacedEvent.args.betId as bigint;
              onBetPlaced?.(betId);
            }
          },
        },
      );
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
      <div
        className={`transition-all duration-300 ease-in-out ${
          selectedNumber ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <label className="label">
          <span className="label-text">Bet amount</span>
        </label>
        <EtherInput value={betAmount} onChange={setBetAmount} />
      </div>

      {!selectedNumber ? (
        <div className="tooltip tooltip-secondary cursor-not-allowed" data-tip="Select a number first">
          <button type="submit" className="btn btn-primary w-full" disabled={true}>
            Place Bet
          </button>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary w-full">
          Place Bet
        </button>
      )}
    </form>
  );
};
