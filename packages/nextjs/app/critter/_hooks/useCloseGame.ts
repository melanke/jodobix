import { useCallback, useState } from "react";
import { Abi, type Hash, parseEther, parseEventLogs } from "viem";
import { usePublicClient } from "wagmi";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const useCloseGame = (
  gameId?: bigint,
  minBetValue = parseEther("0.001"),
  onGameClose?: (reward: bigint, txHash: Hash) => void,
) => {
  const [closingGame, setClosingGame] = useState(false);
  const [lastTwoChars, setLastTwoChars] = useState<string | undefined>(undefined);
  const publicClient = usePublicClient();
  const { data: critterContract } = useDeployedContractInfo("Critter");

  const { writeContractAsync } = useScaffoldWriteContract("Critter");

  const placeBet = useCallback(() => {
    writeContractAsync(
      {
        functionName: "placeBet",
        args: [gameId, Number(1)],
        value: minBetValue,
        gas: 300000n, // 210000n,
      },
      {
        onBlockConfirmation: receipt => {
          const [endingEvent] = parseEventLogs({
            abi: critterContract?.abi as Abi,
            eventName: "EndOfBettingPeriod",
            logs: receipt.logs,
          });

          if (endingEvent && "reward" in endingEvent.args) {
            const reward = endingEvent.args.reward as bigint;
            onGameClose?.(reward, receipt.transactionHash);
          }
          setClosingGame(false);
        },
      },
    ).catch(error => {
      console.error(error);
      setClosingGame(false);
    });
  }, [writeContractAsync, critterContract, gameId, minBetValue, onGameClose]);

  const closeGame = useCallback(async () => {
    if (!critterContract && gameId !== undefined) {
      return;
    }

    setClosingGame(true);

    const block = await publicClient?.getBlock({ blockTag: "latest" });

    if (block?.hash) {
      // Verifica se os últimos dois caracteres são iguais
      const hashStr = block.hash.toString();
      const _lastTwoChars = hashStr.slice(-2);
      setLastTwoChars(_lastTwoChars);
      if (_lastTwoChars[0] === _lastTwoChars[1]) {
        placeBet();
        return;
      } else {
        console.log("Not this block: ", hashStr);
      }
    }
    setTimeout(closeGame, 200);
  }, [gameId, critterContract, placeBet]);

  return {
    closeGame,
    lastTwoChars,
    closingGame,
  };
};
