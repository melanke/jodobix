"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimalSelector } from "../../../_components/AnimalSelector";
import { BetCard } from "../../../_components/BetCard";
import { BetForm } from "../../../_components/BetForm";
import { useCloseGame } from "../../../_hooks/useCloseGame";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ArrowLeftIcon, ArrowPathIcon, InformationCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~~/components/ui/hover-card";
import { useScaffoldReadContract, useWatchBalance } from "~~/hooks/scaffold-eth";
import { useBetsPlaced } from "~~/hooks/useBetPlaceds";

const GameDetailsPage = () => {
  const params = useParams();
  const gameId = BigInt(params.gameId as string);
  const chainId = Number(params.chainId);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const { address, connector } = useAccount();
  const queryClient = useQueryClient();
  const { data: balance } = useWatchBalance({
    address,
  });
  const defaultChainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const { chain } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (chain?.id !== chainId) {
      switchChain?.({ chainId });
    }
  }, [chainId, chain?.id, switchChain]);

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
  };

  const handleShare = async () => {
    const shareData = {
      title: `Jodobix Game #${gameId}`,
      text: "Come play Jodobix with me!",
      url: `${window.location.origin}/jodobix/${chainId}/game/${gameId}`,
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
    <div className="w-full max-w-7xl mx-auto flex flex-col px-6 lg:px-10 py-8 lg:py-12">
      <button onClick={() => router.push(`/jodobix/${chainId}`)} className="btn btn-ghost btn-sm w-fit mb-4 px-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Games
      </button>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="font-bold text-4xl font-encode-sans">
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
          </h1>
          <p className="text-lg text-base-content/70 mt-1">{chainId === 10 ? "Betting for Real" : "Betting for Fun"}</p>
        </div>

        <button onClick={handleShare} className="btn btn-sm btn-secondary">
          <ShareIcon className="h-4 w-4" />
          Share
        </button>
      </div>

      <div className="flex gap-8 items-start flex-col md:flex-row pb-8">
        <AnimalSelector
          selectedNumber={selectedNumber}
          onSelectNumber={handleSelectNumber}
          betsPerNumber={Array.from(game?.betsPerNumber || [])}
          drawnNumber={game?.bettingPeriodEnded ? game?.drawnNumber : undefined}
        />

        <div className="flex flex-col gap-2 h-full">
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
            <div className="w-56 bg-error/50 rounded-lg mb-8 p-2 mt-8">Error loading bets information: {errorMsg}</div>
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
  );
};

export default GameDetailsPage;
