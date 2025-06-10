"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CreateGameModal } from "../_components/CreateGameModal";
import { DismissibleAlert } from "../_components/DismissibleAlert";
import { DistributePrizesModal } from "../_components/DistributePrizesModal";
import { GameCard } from "../_components/GameCard";
import { Abi } from "viem";
import { parseEventLogs } from "viem";
import { useAccount, useSwitchChain } from "wagmi";
import { useBlockNumber } from "wagmi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useBetsPlaced } from "~~/hooks/useBetPlaceds";
import { useGamesCreated } from "~~/hooks/useGamesCreated";

const JodobixClientLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const chainId = Number(params.chainId);
  const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);
  const { address } = useAccount();
  const [isDistributePrizesModalOpen, setIsDistributePrizesModalOpen] = useState(false);
  const [hasUnpaidPrizes, setHasUnpaidPrizes] = useState(false);
  const { data: blockNumber } = useBlockNumber();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { chain } = useAccount();

  useEffect(() => {
    if (chain?.id !== chainId) {
      switchChain?.({ chainId });
    }
  }, [chainId, chain?.id, switchChain]);

  const handleChainSwitch = (newChainId: number) => {
    router.push(`/jodobix/${newChainId}`);
  };

  const { data: publicAvailableGames, isLoading: isLoadingPublicAvailableGames } = useScaffoldReadContract({
    contractName: "Jodobix",
    functionName: "getPublicAvailableGames",
    watch: true,
  });

  const {
    data: myCreatedGames,
    refetch: refetchMyCreatedGames,
    error: errorGameCreatedEvents,
    isLoading: isLoadingGameCreatedEvents,
  } = useGamesCreated({ creator: address, enabled: !!address });

  const {
    data: myPlacedBets,
    error: errorBetPlacedEvents,
    isLoading: isLoadingBetPlacedEvents,
  } = useBetsPlaced({
    bettor: address,
    enabled: !!address && !!blockNumber,
  });

  const gameIdsIHaveBets: bigint[] = useMemo(
    () => [...new Set((myPlacedBets ?? []).map(event => event.gameId).filter(gameId => gameId !== undefined))],
    [myPlacedBets],
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
    router.push(`/jodobix/${chainId}/game/${gameId.toString()}`);
  };

  const handleOpenGame = (gameId: bigint) => {
    router.push(`/jodobix/${chainId}/game/${gameId.toString()}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col px-6 lg:px-10 py-8 lg:py-12">
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => handleChainSwitch(10)}
          className={`rounded-full px-4 py-1 border ${10 === chainId ? "bg-base-content border-base-content text-base-100" : "border-base-300"}`}
        >
          Play for Real
        </button>
        <button
          onClick={() => handleChainSwitch(11155420)}
          className={`rounded-full px-4 py-1 border ${10 !== chainId ? "bg-base-content border-base-content text-base-100" : "border-base-300"}`}
        >
          Play for Fun
        </button>
      </div>
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-encode-sans">Jodobix {10 === chainId ? "for Real" : "for Fun"}</h1>
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

      <DismissibleAlert id="how-it-works" className="bg-base-300/50 mb-8">
        <h2 className="text-xl font-bold mb-2 font-encode-sans">How it works?</h2>
        <p className="mb-2">
          Jodobix is a betting game where you choose one of the 25 available animals. When all animals have received at
          least one bet and the betting period ends, an number will be drawn and the winners who chose the winning
          animal will split the prize proportionally to their bets.
        </p>
        <p className="font-bold">
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
          <h2 className="text-2xl font-bold mb-4 font-encode-sans">Publicly Available Games</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {publicAvailableGames?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(myCreatedGames?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 font-encode-sans">My Created Games</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {myCreatedGames?.map((game, index) => (
              <GameCard key={index} gameId={game.gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(gameIdsIHaveBets?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 font-encode-sans">Games I Have Bet</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gameIdsIHaveBets?.map((gameId, index) => (
              <GameCard key={index} gameId={gameId} onNavigate={handleOpenGame} />
            ))}
          </div>
        </>
      )}

      {(privateGameInvitations?.length ?? 0) > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 font-encode-sans">Private Game Invitations</h2>

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
