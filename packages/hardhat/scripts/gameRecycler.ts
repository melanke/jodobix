import * as dotenv from "dotenv";
dotenv.config();
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { Critter } from "../typechain-types";
import { closeGame } from "../utils/closeGame";

/**
 * Este script verifica continuamente jogos que podem ser fechados e os fecha.
 * Se não houver jogos públicos, criará um novo.
 *
 * para executar:
 * npx hardhat run scripts/game-recycler.ts
 */

async function requestFunds(wallet: Wallet) {
  console.log("Requesting funds from the local faucet...");

  if (!wallet.provider) {
    throw new Error("Provider not found");
  }

  // Get one of the rich accounts from Hardhat
  const [richAccount] = await ethers.getSigners();

  // Send 1 ETH to our wallet
  const tx = await richAccount.sendTransaction({
    to: wallet.address,
    value: ethers.parseEther("2.0"),
  });

  await tx.wait();

  const newBalance = await wallet.provider.getBalance(wallet.address);
  console.log("New balance:", ethers.formatEther(newBalance), "ETH");
}

async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!privateKey) {
    console.log("🚫️ You don't have a deployer account. Run `yarn generate` first");
    return;
  }

  // Get the Hardhat provider
  const provider = await ethers.provider;

  // Connect the wallet to the provider
  const wallet = new Wallet(privateKey, provider);
  console.log("Wallet address:", await wallet.getAddress());

  // Verify balance and request funds if necessary
  const balance = await provider.getBalance(wallet.address);
  if (balance < ethers.parseEther("1.0")) {
    await requestFunds(wallet);
  }

  const contract = await ethers.getContract<Critter>("Critter", wallet);

  while (true) {
    // Search for games that can be closed
    const closeableGameId = await contract.getFirstCloseablePublicGame();

    if (closeableGameId === 0n) {
      console.log("No closeable games found");
    } else {
      console.log("Selected game:", closeableGameId.toString());

      try {
        const { hash, reward } = await closeGame(contract, closeableGameId, 1, true);
        console.log("- Transaction completed successfully:", hash);
        console.log("- Reward:", reward ? ethers.formatEther(reward) : "none");
      } catch (error) {
        console.error("Error closing game:", error);
      }

      // Verify balance and request funds if necessary
      const balance = await provider.getBalance(wallet.address);
      if (balance < ethers.parseEther("1.0")) {
        await requestFunds(wallet);
      }
    }

    // Verify if there are public games
    const anyPublicGame = await contract.getPublicAvailableGames();
    const hasValidGames = anyPublicGame.some(gameId => gameId !== 0n);

    if (!hasValidGames) {
      const tx = await contract.createPublicGame();
      await tx.wait();
      console.log("Created new game", tx.hash);

      // Verify balance and request funds if necessary
      const balance = await provider.getBalance(wallet.address);
      if (balance < ethers.parseEther("1.0")) {
        await requestFunds(wallet);
      }
    } else {
      console.log("Public games found:", anyPublicGame.length);
    }

    // Wait 15 seconds before the next iteration
    await new Promise(resolve => setTimeout(resolve, 15000));
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
