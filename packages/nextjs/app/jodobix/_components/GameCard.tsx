"use client";

import React from "react";
import { formatEther } from "viem";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface GameCardProps {
  gameId: bigint;
  onNavigate: (gameId: bigint) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ gameId, onNavigate }) => {
  const { data: game } = useScaffoldReadContract({
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

  const hasAllNumbersBet = game?.betsPerNumber.every(bet => bet > 0n);

  return (
    <div
      onClick={() => onNavigate(gameId)}
      className="text-white rounded-xl p-4 bg-primary cursor-pointer hover:scale-105 transition-all duration-300 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)]"
    >
      <div className="flex justify-between">
        <h2 className="card-title">Game #{gameId.toString()}</h2>
        {formatEther(game?.totalValue || 0n)} ETH ({game?.numberOfBets.toString()})
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex gap-1">
            Created by <Address address={game?.creator} disableAddressLink={true} />
          </div>
          <div>
            {!hasAllNumbersBet
              ? "There are animals without bets!"
              : timeLeft === BigInt(0)
                ? game?.bettingPeriodEnded
                  ? `Drawn number: ${game?.drawnNumber}`
                  : "About to end"
                : `Estimated end: ${timeLeft?.toString()} blocks`}
          </div>
        </div>
        <div className="btn btn-square btn-white btn-sm">
          <ChevronDoubleRightIcon className="size-4" />
        </div>
      </div>
    </div>
  );
};
