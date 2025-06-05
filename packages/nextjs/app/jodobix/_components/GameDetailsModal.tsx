"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCloseGame } from "../_hooks/useCloseGame";
import { AnimalSelector } from "./AnimalSelector";
import { BetCard } from "./BetCard";
import { BetForm } from "./BetForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useAccount, useChainId } from "wagmi";
import { ArrowPathIcon, InformationCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~~/components/ui/hover-card";
import { useScaffoldReadContract, useWatchBalance } from "~~/hooks/scaffold-eth";
import { useBetsPlaced } from "~~/hooks/useBetPlaceds";

interface GameDetailsModalProps {
  gameId?: bigint; // undefined if not open
  onClose: () => void;
  onBetPlaced?: (betId: bigint) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ gameId, onClose, onBetPlaced }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const { address, connector, chainId } = useAccount();
  const queryClient = useQueryClient();
  const { data: balance } = useWatchBalance({
    address,
  });
  const defaultChainId = useChainId();

  const { data: game, refetch: refetchGame } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getGame",
    args: [gameId],
  });

  const { data: timeLeft } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "timeLeft",
    args: [gameId],
    watch: true,
  });

  const {
    data: myBets,
    isLoading: isLoadingMyBets,
    error: errorMyBets,
  } = useBetsPlaced({
    gameId: gameId?.toString(),
    bettor: address,
    enabled: !!gameId && !!address,
  });

  const errorMsg = useMemo(() => {
    if (errorMyBets) {
      try {
        return JSON.parse((errorMyBets as any).details).message;
      } catch (err) {
        return errorMyBets.toString();
      }
    }
    return null;
  }, [errorMyBets]);

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

  const handleSelectNumber = (number: number) => {
    if (game?.bettingPeriodEnded && game?.drawnNumber) {
      toast.error("Game already ended");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!!game?.participants.length && !game?.participants.includes(address)) {
      toast.error("You are not a participant in this game");
      return;
    }

    setSelectedNumber(number);
  };

  const handleBetPlaced = (betId: bigint, gameId: bigint, number: number) => {
    // Optimistic UI update
    queryClient.setQueryData(
      ["betPlaceds", defaultChainId, gameId?.toString(), undefined, address],
      [
        ...(myBets ?? []),
        {
          betId: betId.toString(),
          gameId: gameId.toString(),
          number,
          bettor: address,
          value: parseEther(betAmount).toString(),
          timestamp: Date.now().toString(),
          blockNumber: "0",
          blockTimestamp: "0",
          transactionHash: "0x",
        },
      ],
    );

    resetBetForm();
    onBetPlaced?.(betId);
  };

  const handleClose = () => {
    resetBetForm();
    onClose();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Jodobix Game #${gameId}`,
      text: "Come play Jodobix with me!",
      url: `${window.location.origin}/jodobix?gameId=${gameId}`,
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
          <h3 className="font-bold text-lg">
            Game #{gameId.toString()}
            {!!game?.participants.length && (
              <HoverCard>
                <HoverCardTrigger className="cursor-pointer text-sm text-base-content/60 ml-2 hover:underline">
                  ({game?.participants.length} participants{" "}
                  <InformationCircleIcon className="inline h-4 w-4 text-base-content/60" />)
                </HoverCardTrigger>
                <HoverCardContent className="w-50 bg-base-100 text-base-content border-base-300">
                  <div className="flex flex-col gap-2">
                    {game?.participants.map(participant => <Address key={participant} address={participant} />)}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </h3>

          <button onClick={handleShare} className="btn btn-sm btn-secondary">
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
          <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <div className="flex gap-8 items-start flex-col md:flex-row pb-8">
          <AnimalSelector
            selectedNumber={selectedNumber}
            onSelectNumber={handleSelectNumber}
            betsPerNumber={Array.from(game?.betsPerNumber || [])}
            drawnNumber={game?.bettingPeriodEnded ? game?.drawnNumber : undefined}
          />

          <div className="flex flex-col gap-2 h-full self-center">
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
                  <HoverCard>
                    <HoverCardTrigger className="flex items-center gap-1 cursor-pointer hover:underline">
                      About to end
                      <InformationCircleIcon className="h-4 w-4 text-base-content/60" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-base-100 text-base-content border-base-300">
                      <div className="w-50">
                        Anyone using a burner wallet can close the game and receive a reward. Give it a try!
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </>
              )}
            </div>

            {game?.creator === "0x0000000000000000000000000000000000000000" ? (
              <div className="w-56 bg-error/50 rounded-lg mb-8 p-2 mt-8">Game not found!</div>
            ) : isLoadingMyBets ? (
              <div className="self-center mt-8">
                <ArrowPathIcon className="h-6 w-6 animate-spin" />
              </div>
            ) : !!errorMsg ? (
              <div className="w-56 bg-error/50 rounded-lg mb-8 p-2 mt-8">
                Error loading bets information: {errorMsg}
              </div>
            ) : (
              <>
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
                    {myBets?.map((bet, index) => (
                      <BetCard
                        key={index}
                        betId={bet.betId}
                        drawnNumber={game?.bettingPeriodEnded ? game?.drawnNumber : undefined}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
