import { task } from "hardhat/config";
import { Wallet } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 * This script will bet on all numbers that were not bet on yet of a specific game.
 *
 * to run:
 * npx hardhat fillgame --game-id <gameId>
 */

async function requestFunds(wallet: Wallet) {
  console.log("Requesting funds from local faucet...");

  if (!wallet.provider) {
    throw new Error("Provider not found");
  }

  const [richAccount] = await ethers.getSigners();
  const tx = await richAccount.sendTransaction({
    to: wallet.address,
    value: ethers.parseEther("1.0"),
  });

  await tx.wait();

  const newBalance = await wallet.provider.getBalance(wallet.address);
  console.log("New balance:", ethers.formatEther(newBalance), "ETH");
}

task("fillgame", "Fill all empty numbers in a game with bets")
  .addParam("gameId", "The ID of the game to fill")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers } = hre;
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

    if (!privateKey) {
      console.log("🚫️ You don't have a deployer account. Run `yarn generate` first");
      return;
    }

    const provider = await ethers.provider;
    const wallet = new Wallet(privateKey, provider);
    console.log("Wallet address:", await wallet.getAddress());

    const balance = await provider.getBalance(wallet.address);
    if (balance < ethers.parseEther("1.0")) {
      await requestFunds(wallet);
    }

    const contract = await ethers.getContract("Jodobix", wallet);
    const game = await contract.getGame(taskArgs.gameId);

    for (let number = 0; number < 25; number++) {
      if (game.betsPerNumber[number] === 0n) {
        console.log(`Placing bet on number ${number + 1}`);

        try {
          const tx = await contract.placeBet(taskArgs.gameId, number + 1, { value: ethers.parseEther("0.001") });
          const receipt = await tx.wait();

          console.log(`Bet placed on number ${number + 1} with signature ${receipt?.hash}`);

          const betPlacedEvent = receipt?.logs.find(log => {
            try {
              return (
                contract.interface.parseLog({
                  topics: [...log.topics],
                  data: log.data,
                })?.name === "BetPlaced"
              );
            } catch {
              return false;
            }
          });

          if (betPlacedEvent) {
            const parsedEvent = contract.interface.parseLog({
              topics: [...betPlacedEvent.topics],
              data: betPlacedEvent.data,
            });
            console.log("Bet placed time:", parsedEvent?.args.timestamp.toString());
          }
        } catch (error) {
          console.error(`Error placing bet on number ${number + 1}:`, error);
        }
      }
    }
  });
