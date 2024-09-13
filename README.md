# Crypto Staking App

The **Crypto Staking App** is a decentralized application (DApp) that allows users to buy the **ARCHI** ERC20 token using ETH, stake the token to earn rewards, and withdraw their tokens after a locking period. The app includes an admin panel for managing staking pools and a notification system to keep users updated on the protocol status.

## Features

### User Features
1. **Buy ARCHI Token**: Users can purchase ARCHI ERC20 tokens with ETH via the integrated ICO contract.
2. **Stake Tokens**: Users can stake ARCHI tokens in different staking pools, each offering unique Annual Percentage Yields (APYs).
3. **Claim Rewards**: Rewards are claimable after a 1-day lock period.
4. **Withdraw Tokens**: Users can withdraw their staked ARCHI tokens at any time after the locking period.
5. **Notifications**: A notification system informs users of updates and staking events.

### Admin Features
1. **Token Transfer**: Admin can transfer ARCHI tokens to the ICO contract for users to buy and invest.
2. **Create Staking Pools**: Admin has exclusive access to create new staking pools with customizable APYs.
3. **Track Investments**: Admin can monitor and track user investments in the staking pools.
4. **Update Token Contract**: Admin can update the token contract or adjust token prices.

## Contracts

- **[ICO Contract](./contracts/TokenICO.sol)**: Handles the purchasing of ARCHI tokens using ETH.
- **[StakingDapp Contract](./contracts/StakingDapp.sol)**: Manages staking, rewards, and withdrawals for ARCHI tokens. This contract restricts pool modifications (add, modify, or remove) to the owner only.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - A React-based framework for building the user interface.
- **Smart Contracts**: [Solidity](https://soliditylang.org/) - Used to write the ARCHI token, ICO, and staking contracts.
- **Blockchain**: Ethereum-based, utilizing ERC20 standards. Contracts are deployed on the Ethereum test network (Holesky) using [Remix IDE](https://remix.ethereum.org/) and MetaMask Wallet.

## Local Deployment

#### 1. Clone the repository:
```bash
git clone https://github.com/ArijitGuha0179/staking.git
cd staking
```
#### 2. Install dependencies:
```bash
npm install
```
#### 3. Set up environment variables:

Create a .env file in the root directory and include the following variables:
<details> <summary>Click to view .env variables</summary>

##### STAKING DAPP ADDRESS
NEXT_PUBLIC_STAKING_DAPP = 

NEXT_PUBLIC_TOKEN_ICO = 

##### TOKEN ADDRESS
NEXT_PUBLIC_DEPOSIT_TOKEN = 

NEXT_PUBLIC_REWARD_TOKEN = 

NEXT_PUBLIC_TOKEN_LOGO = 

##### ADMIN

NEXT_PUBLIC_ADMIN_ADDRESS = 

##### CURRENCY

NEXT_PUBLIC_CURRENCY = 

NEXT_PUBLIC_CHAIN_ID = 

NEXT_PUBLIC_NETWORK_NAME = 

NEXT_PUBLIC_NETWORK_DECIMALS = 

NEXT_PUBLIC_NETWORK = 

##### RPC URLS

NEXT_PUBLIC_HOLESKY_RPC_URL = 

NEXT_PUBLIC_ADDRESS_EXPLORER = 

NEXT_PUBLIC_TOKEN_EXPLORER = 

NEXT_PUBLIC_EXPLORER = 

##### FORMSPREE
NEXT_PUBLIC_FORMSPREE_API = 
</details>

#### 4. Start the development server:
```bash
npm run dev
```