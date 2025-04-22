import { ethers } from "hardhat";
import { Jodobix } from "../typechain-types";
import { EventLog } from "ethers";

export async function closeGame(
  contract: Jodobix,
  gameId: bigint,
  betNumber = 1,
  verbose = false,
): Promise<{ hash: string; reward?: bigint }> {
  const betValue = ethers.parseEther("0.001"); // 0.001 ETH

  while (true) {
    // Get the last blockhash
    const blockNumber = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);

    if (!block) {
      if (verbose) {
        console.log("Block not found, waiting for next block...");
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      continue;
    }

    if (!block.hash) {
      if (verbose) {
        console.log("Block hash not available, waiting for next block...");
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      continue;
    }

    const blockHash = block.hash;

    // Verify if the last two characters are the same
    if (blockHash.slice(-2)[0] === blockHash.slice(-2)[1]) {
      if (verbose) {
        console.log(`Blockhash found with repeated characters: ${block.hash}`);
      }

      const tx = await contract.placeBet(gameId, betNumber, {
        value: betValue,
        gasLimit: 500000,
      });

      const receipt = await tx.wait();

      const endingEvent = (receipt?.logs as EventLog[]).find(log => log.fragment?.name === "EndOfBettingPeriod");

      if (endingEvent) {
        const reward = endingEvent.args?.reward;

        if (verbose) {
          console.log("Game closed successfully!");
          console.log("Transaction hash:", tx.hash);
          console.log("Reward:", ethers.formatEther(reward), "ETH");
        }

        return {
          hash: tx.hash,
          reward: reward,
        };
      }
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }
}
