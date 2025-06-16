# Jodobix

## About

Jodobix is an experiment of a fully decentralized betting game on Optimism that doesn't rely on external parts.

Betting games are becoming more and more popular. And where I live — in Brazil — they’re causing serious debt problems because of how addictive they are.

Of course, we need better laws and education to deal with this.  
But I also think most of these games are run by companies that don’t really offer anything in return. They’re just middlemen taking a huge cut.

Every year, billions of dollars go from players to game owners who do nothing but sit in the middle.

---

Jodobix is a betting game that runs on Optimism. It’s fully automatic, it can’t be stopped, and it doesn’t belong to anyone — not even me.

All the money from the bets goes straight to the winners. The house takes nothing. I don’t take anything either.

---

### ⚠️ IT'S AN EXPERIMENT
Contrary to the recommended way of picking a random number in EVM smart contracts — which relies on an external source — Jodobix experiments with a different approach. It creates a temporary winner on each bet based on the combination of the blockhash of each bet and only confirms the winner when the game encounters a hash where the last two digits are repeated. I believe there's no way to predict or avoid this moment.
I've tested this theory myself, extensively trying to manipulate or predict the result. There will be a second round of tests with family and friends, and I’d like to move the project forward by talking with node specialists to understand the practical risks.

## Contributing

### Requirements

Before you begin, install the following tools:

- [Node.js (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### Quickstart

#### 1. Install dependencies

```sh
yarn install
```

#### 2. Run a local network

In the first terminal:

```sh
yarn chain
```

This starts a local Ethereum network using Hardhat. The network runs on your machine and can be used for testing and development. You can customize the configuration in `packages/hardhat/hardhat.config.ts`.

#### 3. Deploy the contract

In a second terminal:

```sh
yarn deploy
```

This deploys the smart contract to the local network. Contracts are located in `packages/hardhat/contracts`, and the deployment script is in `packages/hardhat/deploy`.

#### 4. Start the Next.js app

In a third terminal:

```sh
yarn start
```

Then visit: [http://localhost:3000](http://localhost:3000)

To run smart contract tests:

```sh
yarn hardhat:test
```

#### 5. Mock other bettors

To simulate additional bettors, run:

```sh
yarn fillgame --game-id 1
```

This script places a bet on each empty option.

#### 6. End the betting period

Run the game recycler bot:

```sh
yarn gamerecycler
```

OR

```sh
yarn gamerecycler:opSepolia
```

OR

```sh
yarn gamerecycler:optimism
```

This bot automatically closes eligible games and creates new ones if no public open games exist.
