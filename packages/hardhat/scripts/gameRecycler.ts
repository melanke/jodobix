import * as dotenv from "dotenv";
dotenv.config();
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { Jodobix } from "../typechain-types";
import { closeGame } from "../utils/closeGame";

/**
 * Este script verifica continuamente jogos que podem ser fechados e os fecha.
 * Se não houver jogos públicos, criará um novo.
 *
 * Para executar:
 * yarn gamerecycler              (rede local hardhat)
 * yarn gamerecycler:opSepolia    (Optimism Sepolia testnet)
 * yarn gamerecycler:optimism     (Optimism mainnet)
 *
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

  // Show network info
  const network = await provider.getNetwork();
  console.log("Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");

  // Verify balance and request funds if necessary
  const balance = await provider.getBalance(wallet.address);
  console.log("Current balance:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.5") && network.name === "hardhat") {
    await requestFunds(wallet);
  }

  const contract = await ethers.getContract<Jodobix>("Jodobix", wallet);
  console.log("Contract address:", await contract.getAddress());

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

      // Verify balance and request funds if necessary (only for local network)
      const balance = await provider.getBalance(wallet.address);
      if (balance < ethers.parseEther("0.5")) {
        if (network.name === "hardhat") {
          await requestFunds(wallet);
        } else {
          console.log("⚠️ Low balance:", ethers.formatEther(balance), "ETH.");
        }
      }
    }

    // Verify if there are public games
    const anyPublicGame = await contract.getPublicAvailableGames();
    const hasValidGames = anyPublicGame.some(gameId => gameId !== 0n);

    if (!hasValidGames) {
      console.log("Creating new public game...");
      const tx = await contract.createPublicGame();
      await tx.wait();
      console.log("Created new game", tx.hash);

      // Verify balance and request funds if necessary (only for local network)
      const balance = await provider.getBalance(wallet.address);
      if (balance < ethers.parseEther("0.5")) {
        if (network.name === "hardhat") {
          await requestFunds(wallet);
        } else {
          console.log("⚠️ Low balance:", ethers.formatEther(balance), "ETH.");
        }
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
