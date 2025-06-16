# Jodobix

## About

This project is a proof of concept (POC) for a fully decentralized betting game on Ethereum that doesn't rely on external parties.

## Requirements

Before you begin, install the following tools:

- [Node.js (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

### 1. Install dependencies

```sh
yarn install
```

### 2. Run a local network

In the first terminal:

```sh
yarn chain
```

This starts a local Ethereum network using Hardhat. The network runs on your machine and can be used for testing and development. You can customize the configuration in `packages/hardhat/hardhat.config.ts`.

### 3. Deploy the contract

In a second terminal:

```sh
yarn deploy
```

This deploys the smart contract to the local network. Contracts are located in `packages/hardhat/contracts`, and the deployment script is in `packages/hardhat/deploy`.

### 4. Start the Next.js app

In a third terminal:

```sh
yarn start
```

Then visit: [http://localhost:3000](http://localhost:3000)

To run smart contract tests:

```sh
yarn hardhat:test
```

### 5. Mock other bettors

To simulate additional bettors, run:

```sh
yarn fillgame --game-id 1
```

This script places a bet on each empty option.

### 6. End the betting period

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
