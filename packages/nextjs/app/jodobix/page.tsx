"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateGameModal } from "./_components/CreateGameModal";
import { DismissibleAlert } from "./_components/DismissibleAlert";
import { DistributePrizesModal } from "./_components/DistributePrizesModal";
import { GameCard } from "./_components/GameCard";
import { GameDetailsModal } from "./_components/GameDetailsModal";
import { Abi } from "viem";
import { parseEventLogs } from "viem";
import { useAccount } from "wagmi";
import { useBlockNumber } from "wagmi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  useDeployedContractInfo,
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";

const JodobixClientLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameIdParam = searchParams.get("gameId");
  const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);
  const [openGameId, setOpenGameId] = useState<bigint | undefined>(gameIdParam ? BigInt(gameIdParam) : undefined);
  const { address, chainId } = useAccount();
  const [isDistributePrizesModalOpen, setIsDistributePrizesModalOpen] = useState(false);
  const [hasUnpaidPrizes, setHasUnpaidPrizes] = useState(false);
  const { data: blockNumber } = useBlockNumber();

  const { data: publicAvailableGames, isLoading: isLoadingPublicAvailableGames } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getPublicAvailableGames",
    watch: true,
  });

  const fromBlock = blockNumber ? blockNumber - 499n : 10n;

  const {
    data: gameCreatedEvents,
    refetch: refetchMyCreatedGames,
    error: errorGameCreatedEvents,
    isLoading: isLoadingGameCreatedEvents,
  } = useScaffoldEventHistory({
    contractName: "Jodobix",
    eventName: "GameCreated",
    fromBlock,
    filters: {
      creator: address,
    },
    enabled: !!address && !!blockNumber,
  });

  const myCreatedGames = gameCreatedEvents?.map(event => event.args.gameId).filter(gameId => gameId !== undefined);

  const {
    data: betPlacedEvents,
    error: errorBetPlacedEvents,
    isLoading: isLoadingBetPlacedEvents,
  } = useScaffoldEventHistory({
    contractName: "Jodobix",
    eventName: "BetPlaced",
    fromBlock,
    filters: {
      bettor: address,
    },
    enabled: !!address && !!blockNumber,
  });

  const gamesIHaveBet = useMemo(
    () => [...new Set((betPlacedEvents ?? []).map(event => event.args.gameId).filter(gameId => gameId !== undefined))],
    [betPlacedEvents],
  );

  const { data: privateGameInvitations } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getPrivateGameInvitations",
    args: [address],
    watch: true,
  });

  const { data: publicAvailableGamesCount } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "publicAvailableGamesCount",
  });

  const { data: jodobixContractInfo } = useDeployedContractInfo("Jodobix");
  const { writeContractAsync } = useScaffoldWriteContract("Jodobix");

  const handleCreatePublicGame = async () => {
    await writeContractAsync(
      { functionName: "createPublicGame" },
      {
        onBlockConfirmation: receipt => {
          const [gameCreatedEvent] = parseEventLogs({
            abi: jodobixContractInfo?.abi as Abi,
            eventName: "GameCreated",
            logs: receipt.logs,
          });

          if (gameCreatedEvent && "gameId" in gameCreatedEvent.args) {
            const gameId = gameCreatedEvent.args.gameId as bigint;
            handleGameCreated(gameId);
          }
        },
      },
    );
  };

  const handleGameCreated = (gameId: bigint) => {
    refetchMyCreatedGames();
    setOpenGameId(gameId);
  };

  const handleGameBet = (gameId: bigint) => {
    refetchMyCreatedGames();
  };

  const handleOpenGame = (gameId: bigint | undefined) => {
    if (gameId) {
      router.push(`/jodobix?gameId=${gameId.toString()}`);
    } else {
      router.push("/jodobix");
    }
    setOpenGameId(gameId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col px-6 lg:px-10 py-8 lg:py-12">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Jodobix</h1>
        <div className="flex gap-2">
          <button
            onClick={handleCreatePublicGame}
            className="btn btn-primary"
            disabled={publicAvailableGamesCount === BigInt(10)}
          >
            Create Public Game
          </button>
          <button onClick={() => setIsCreateGameModalOpen(true)} className="btn btn-primary">
            Create Private Game
          </button>
        </div>
      </div>

      <DismissibleAlert id="how-it-works" className="bg-base-300/50 rounded-lg mb-8 border border-primary">
        <h2 className="text-xl font-bold mb-2">How it works?</h2>
        <p className="mb-2">
          Jodobix is a betting game where you choose one of the 25 available animals. When all animals have received at
          least one bet and the betting period ends, a number will be drawn and the winners who chose the winning animal
          will split the prize proportionally to their bets.
        </p>
        <p className="text-primary">
          Click on any game below to see the details and make your bet. The minimum bet is 0.001 ETH.
        </p>
      </DismissibleAlert>

      {(errorGameCreatedEvents || errorBetPlacedEvents) && (
        <div className="bg-error/50 rounded-lg mb-8 p-8">
          Error loading games information:{" "}
          {JSON.parse(((errorGameCreatedEvents ?? errorBetPlacedEvents) as any).details).message}
        </div>
      )}

      {isLoadingGameCreatedEvents || isLoadingBetPlacedEvents || isLoadingPublicAvailableGames ? (
        <div className="self-center mt-8">
          <ArrowPathIcon className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        !publicAvailableGames?.length && (
          <div className="flex justify-center items-center h-48">
            <p className="text-lg text-base-content-200">No public games available</p>
          </div>
        )
      )}

      {!!publicAvailableGames?.length && (
        <>
          <h2 className="text-2xl font-bold mb-4">Publicly Available Games</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {publicAvailableGames?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(myCreatedGames?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">My Created Games</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {myCreatedGames?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(gamesIHaveBet?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Games I Have Bet</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gamesIHaveBet?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(privateGameInvitations?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Private Game Invitations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {privateGameInvitations?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {hasUnpaidPrizes && (
        <div
          onClick={() => setIsDistributePrizesModalOpen(true)}
          className="self-center mt-16 px-6 bg-base-300 rounded-lg shadow-lg cursor-pointer hover:bg-base-300 transition-colors duration-200"
        >
          <p className="text-sm flex items-center gap-2">
            <span role="img" aria-label="gift" className="text-lg">
              🎁
            </span>
            Feeling generous? Help users claim their prizes!
          </p>
        </div>
      )}

      <CreateGameModal
        isOpen={isCreateGameModalOpen}
        onClose={() => setIsCreateGameModalOpen(false)}
        onCreated={handleGameCreated}
      />
      <GameDetailsModal gameId={openGameId} onClose={() => handleOpenGame(undefined)} onBetPlaced={handleGameBet} />
      <DistributePrizesModal
        isOpen={isDistributePrizesModalOpen}
        onClose={() => setIsDistributePrizesModalOpen(false)}
        onHasUnpaidPrizesChange={setHasUnpaidPrizes}
      />
    </div>
  );
};

const JodobixPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <ArrowPathIcon className="h-10 w-10 animate-spin" />
        </div>
      }
    >
      <JodobixClientLogic />
    </Suspense>
  );
};

export default JodobixPage;
