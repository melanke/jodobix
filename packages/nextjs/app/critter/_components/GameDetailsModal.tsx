"use client";

import React, { useEffect, useState } from "react";
import { useCloseGame } from "../_hooks/useCloseGame";
import { AnimalSelector } from "./AnimalSelector";
import { BetCard } from "./BetCard";
import { BetForm } from "./BetForm";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { InformationCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useWatchBalance } from "~~/hooks/scaffold-eth";

interface GameDetailsModalProps {
  gameId?: bigint; // undefined if not open
  onClose: () => void;
  onBetPlaced?: (betId: bigint) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ gameId, onClose, onBetPlaced }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const { address, connector } = useAccount();
  const { data: balance } = useWatchBalance({
    address,
  });

  const { data: game, refetch: refetchGame } = useScaffoldReadContract({
    contractName: "Critter",
    functionName: "getGame",
    args: [gameId],
  });

  const { data: timeLeft } = useScaffoldReadContract({
    contractName: "Critter",
    functionName: "timeLeft",
    args: [gameId],
    watch: true,
  });

  const { data: myBets, refetch: refetchMyBets } = useScaffoldReadContract({
    contractName: "Critter",
    functionName: "getBetsByGameAndBettor",
    args: [gameId, address],
  });

  const { closeGame, closingGame, lastTwoChars } = useCloseGame(gameId ?? 0n, game?.minBetValue, reward => {
    toast.success(`Game closed! Reward: ${formatEther(reward)} ETH`);
    refetchGame();
  });

  const hasAllNumbersBet = game?.betsPerNumber.every(bet => bet > 0n);

  useEffect(() => {
    if (game && betAmount === "") {
      setBetAmount(formatEther(game.minBetValue));
    }
  }, [game, betAmount]);

  const resetBetForm = () => {
    setSelectedNumber(null);
    setBetAmount("");
  };

  const handleBetPlaced = (betId: bigint) => {
    resetBetForm();
    refetchMyBets();
    onBetPlaced?.(betId);
  };

  const handleClose = () => {
    resetBetForm();
    onClose();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Critter Game #${gameId}`,
      text: "Come play Critter with me!",
      url: `${window.location.origin}/critter?gameId=${gameId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Error sharing");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Error copying link");
      }
    }
  };

  const handleCloseGame = async () => {
    await closeGame();
  };

  if (!gameId) return null;

  const showCloseBtn =
    connector?.type === "burnerWallet" &&
    (balance?.value ?? 0n) > parseEther("0.01") &&
    timeLeft === BigInt(0) &&
    hasAllNumbersBet &&
    !game?.bettingPeriodEnded;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Game #{gameId.toString()}</h3>

          <button onClick={handleShare} className="btn btn-sm btn-secondary">
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
          <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <div className="flex gap-8 md:h-[calc(100%-3.3rem)] items-start flex-col md:flex-row">
          <AnimalSelector
            selectedNumber={selectedNumber}
            onSelectNumber={setSelectedNumber}
            betsPerNumber={Array.from(game?.betsPerNumber || [])}
            drawnNumber={game?.bettingPeriodEnded ? game?.drawnNumber : undefined}
          />

          <div className="flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden self-center">
            <div>
              Total Value: {formatEther(game?.totalValue || 0n)} ETH ({game?.numberOfBets.toString()} bets)
            </div>
            <div className="flex gap-1">
              Created by <Address address={game?.creator} />
            </div>
            <div>
              {timeLeft !== BigInt(0) ? (
                `Estimated end: ${timeLeft?.toString()} blocks`
              ) : !hasAllNumbersBet ? (
                "Waiting for bets on all numbers"
              ) : game?.bettingPeriodEnded ? (
                <span className="font-bold bg-secondary text-secondary-content p-1 rounded-md">
                  Drawn number: {game?.drawnNumber}
                </span>
              ) : showCloseBtn ? (
                <button onClick={handleCloseGame} disabled={closingGame} className="btn btn-sm btn-outline btn-primary">
                  {closingGame ? `Closing Game... ${lastTwoChars}` : "Close Game"}
                </button>
              ) : (
                <>
                  About to end
                  <div
                    className="tooltip tooltip-secondary tooltip-right"
                    data-tip="Anyone using a burner wallet can close the game and receive a reward. Give it a try!"
                  >
                    <InformationCircleIcon className="h-4 w-4 text-base-content/60" />
                  </div>
                </>
              )}
            </div>

            <BetForm
              gameId={gameId}
              selectedNumber={selectedNumber}
              onBetPlaced={handleBetPlaced}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
            />

            {(myBets?.length ?? 0) > 0 && (
              <>
                <h3 className="font-bold text-lg mt-6 mb-1">My Bets</h3>
                {myBets?.map((betId, index) => (
                  <BetCard
                    key={index}
                    betId={betId}
                    drawnNumber={game?.bettingPeriodEnded ? game?.drawnNumber : undefined}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
