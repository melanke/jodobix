"use client";

import React, { useCallback, useEffect } from "react";
import { DismissibleAlert } from "./DismissibleAlert";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";

interface DistributePrizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHasUnpaidPrizesChange: (hasUnpaidPrizes: boolean) => void;
}

const WinningBetItem: React.FC<{
  betId: bigint;
  onBetStatusChange: (betId: bigint, shouldShow: boolean) => void;
}> = ({ betId, onBetStatusChange }) => {
  const { data: bet, refetch: refetchBet } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getBet",
    args: [betId],
  });

  const { data: prize } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getPrize",
    args: [betId],
    query: {
      enabled: !bet?.prizeIsPaid,
    },
  });

  useEffect(() => {
    // Inform parent if this bet should be shown (not paid) or not (paid or invalid)
    onBetStatusChange(betId, !(!bet || bet.prizeIsPaid));
  }, [bet, betId, onBetStatusChange]);

  const { writeContractAsync } = useScaffoldWriteContract("Jodobix");

  const requestPrizePayment = async () => {
    try {
      await writeContractAsync({
        functionName: "requestPrizePayment",
        args: [betId],
      });
      await refetchBet();
    } catch (error) {
      console.error("Error paying prize:", error);
    }
  };

  const shouldShow = !(!bet || bet.prizeIsPaid);

  return (
    <div className={shouldShow ? "block" : "hidden"}>
      <div className="flex items-center justify-between space-x-4 p-2 border rounded-lg bg-base-200">
        <div className="flex flex-col">
          <span>Bet ID: {betId.toString()}</span>
          <span>Prize: {formatEther(prize || 0n)} ETH</span>
          <span className="flex items-center gap-2">
            Bettor: <Address address={bet?.bettor} />
          </span>
        </div>
        <button onClick={requestPrizePayment} className="btn btn-primary">
          Request Prize Payment
        </button>
      </div>
    </div>
  );
};

const EndedGameItem: React.FC<{
  gameId: bigint;
  drawnNumber: number;
  onGameStatusChange: (gameId: bigint, hasUnpaidBets: boolean) => void;
}> = ({ gameId, drawnNumber, onGameStatusChange }) => {
  const [visibleBets, setVisibleBets] = React.useState<Set<bigint>>(new Set());

  const {
    data: winningBets,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "Jodobix",
    eventName: "BetPlaced",
    fromBlock: 0n,
    filters: {
      gameId: gameId,
      number: drawnNumber,
    },
    enabled: !!gameId && !!drawnNumber,
  });

  const validBets = winningBets?.filter(bet => !!bet.args.betId) ?? [];

  const handleBetStatusChange = useCallback((betId: bigint, shouldShow: boolean) => {
    setVisibleBets(prev => {
      const newSet = new Set(prev);
      if (shouldShow) {
        newSet.add(betId);
      } else {
        newSet.delete(betId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    // Inform parent about whether this game has any unpaid bets
    onGameStatusChange(gameId, visibleBets.size > 0);
  }, [gameId, visibleBets.size, onGameStatusChange]);

  const shouldShow = (visibleBets.size > 0 || isLoading) && winningBets && winningBets.length > 0;

  if (isLoading) return <div>Loading bets...</div>;
  if (error) return <div>Error loading bets</div>;

  return (
    <div className={shouldShow ? "block" : "hidden"}>
      <div className="mb-6 p-4 border rounded-xl bg-base-100">
        <h4 className="text-lg font-semibold mb-4">
          Game {gameId.toString()} - Drawn Number: {drawnNumber}
        </h4>
        <div className="space-y-2">
          {validBets.map(bet => (
            <WinningBetItem
              key={bet.args.betId!.toString()}
              betId={bet.args.betId!}
              onBetStatusChange={handleBetStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const DistributePrizesModal: React.FC<DistributePrizesModalProps> = ({
  isOpen,
  onClose,
  onHasUnpaidPrizesChange,
}) => {
  const { chainId } = useAccount();
  const [gamesWithUnpaidBets, setGamesWithUnpaidBets] = React.useState<Set<bigint>>(new Set());

  const {
    data: endedGames,
    error: errorEndOfBettingPeriodEvents,
    isLoading: isLoadingEndOfBettingPeriodEvents,
  } = useScaffoldEventHistory({
    contractName: "Jodobix",
    eventName: "EndOfBettingPeriod",
    fromBlock: 0n,
  });

  const handleGameStatusChange = useCallback((gameId: bigint, hasUnpaidBets: boolean) => {
    setGamesWithUnpaidBets(prev => {
      const newSet = new Set(prev);
      if (hasUnpaidBets) {
        newSet.add(gameId);
      } else {
        newSet.delete(gameId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    onHasUnpaidPrizesChange(gamesWithUnpaidBets.size > 0);
  }, [gamesWithUnpaidBets.size, onHasUnpaidPrizesChange]);

  let content;
  if (isLoadingEndOfBettingPeriodEvents) {
    content = <div>Loading games...</div>;
  } else if (errorEndOfBettingPeriodEvents) {
    content = <div>Error loading games</div>;
  } else if (endedGames && endedGames.length > 0) {
    content = endedGames
      .filter(game => !!game.args.gameId && !!game.args.drawnNumber)
      .map(game => (
        <EndedGameItem
          key={game.args.gameId!.toString()}
          gameId={game.args.gameId!}
          drawnNumber={game.args.drawnNumber!}
          onGameStatusChange={handleGameStatusChange}
        />
      ));
  }

  const hasGamesToShow = gamesWithUnpaidBets.size > 0 || isLoadingEndOfBettingPeriodEvents;

  return (
    <div className={cn("modal", isOpen ? "modal-open" : "")}>
      <div className="modal-box w-11/12 max-w-5xl h-full">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Distribute Prizes</h3>
        <DismissibleAlert id="distribute-prizes" className="bg-base-300/50 rounded-lg mb-8 border border-primary/50">
          <p>This page allows you to distribute prizes to the winners of the games.</p>
          <p>
            The winners can always see and claim their prizes, but sometimes they are distracted and forget to claim
            them. If you are feeling generous, you can use this page to distribute the prizes to the winners.
          </p>
        </DismissibleAlert>
        <div className="max-h-[60vh] overflow-y-auto">{content}</div>
        {!hasGamesToShow && <div>No prizes to distribute</div>}
      </div>
    </div>
  );
};
