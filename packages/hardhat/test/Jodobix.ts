import { expect } from "chai";
import { ethers } from "hardhat";
import { Jodobix } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { EventLog } from "ethers";
import { closeGame } from "../utils/closeGame";

describe("Jodobix", function () {
  let jodobix: Jodobix;
  let bettor: SignerWithAddress;

  before(async () => {
    [, bettor] = await ethers.getSigners();
    const jodobixFactory = await ethers.getContractFactory("Jodobix");
    jodobix = await jodobixFactory.deploy(ethers.parseEther("0.001"), 1, ethers.parseEther("0.001")); // The important parameter here is "1" for the BETTING_PERIOD_BLOCKS_FOR_PUBLIC_GAMES, to allow us to test closing and requesting the prize payment  });
  });

  it("The workflow should work as expected", async function () {
    // Create the game
    const tx = await jodobix.createPublicGame();
    const receipt = await tx.wait();
    const gameCreatedEvent = (receipt?.logs as EventLog[]).find(log => log.fragment?.name === "GameCreated");
    const gameId = gameCreatedEvent?.args?.gameId;

    // Array to store the bet IDs
    const bets: bigint[] = [];

    // Make 25 bets (one for each number)
    for (let i = 0; i < 25; i++) {
      const betNumber = i + 1;
      const betValue = ethers.parseEther("1"); // 1 ETH

      const betTx = await jodobix.connect(bettor).placeBet(gameId, betNumber, { value: betValue });
      const betReceipt = await betTx.wait();

      const betPlacedEvent = (betReceipt?.logs as EventLog[]).find(log => log.fragment?.name === "BetPlaced");
      const betId = betPlacedEvent?.args?.betId;
      bets.push(betId);

      // Verify if the bet was registered correctly
      const game = await jodobix.getGame(gameId);
      expect(game.betsPerNumber[betNumber - 1]).to.equal(betValue);
      expect(game.totalValue).to.equal(betValue * BigInt(i + 1));
    }

    const publicAvailableGames = await jodobix.getPublicAvailableGames();
    expect(publicAvailableGames.length).to.equal(1);
    expect(publicAvailableGames[0]).to.equal(gameId);

    await closeGame(jodobix, gameId, 1, true);

    // Get the drawn number
    const game = await jodobix.getGame(gameId);
    const drawnNumber = game.drawnNumber;
    expect(drawnNumber).to.be.greaterThan(0);
    expect(drawnNumber).to.be.lessThanOrEqual(25);

    // Verify the prize of the winning bet
    const winningBetId = bets[Number(drawnNumber) - 1];
    const prize = await jodobix.getPrize(winningBetId);

    // The prize should be approximately 24.999 ETH (25 ETH - 0.001 ETH of the closer reward)
    expect(prize).to.be.closeTo(ethers.parseEther("24.999"), ethers.parseEther("0.001"));

    // Verify the bettor's balance before claiming the prize
    const bettorBalanceBeforeClaim = await ethers.provider.getBalance(bettor.address);

    // Claim the prize
    const requestTx = await jodobix.connect(bettor).requestPrizePayment(winningBetId);
    await requestTx.wait();

    // Verify if the value was updated in the game
    const updatedGame = await jodobix.games(gameId);
    expect(updatedGame.valueProvidedToWinners).to.be.closeTo(ethers.parseEther("24.999"), ethers.parseEther("0.001"));

    // Verify if the bettor's balance increased
    const bettorBalanceAfterClaim = await ethers.provider.getBalance(bettor.address);
    expect(bettorBalanceAfterClaim).to.be.gt(bettorBalanceBeforeClaim);
  });
});
