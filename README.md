# FaazNFT Marketplace

A decentralized NFT marketplace built using **Solidity**, **ERC-1155**, and **ERC-2981** for minting, bidding/auction, royalties, and ownership management. This project allows creators to mint and auction their digital assets such as art, music, and videos with integrated royalties.

## Features
- Mint NFT tokens with royalties
- Start and manage auctions
- Bidding functionality for Art | Music | Video NFTs
- Ownership transfer after auction completion
- Integrated royalty support using ERC-2981

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn
- Hardhat
- Ganache (for local testing)
  
## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/faaz-nft.git
cd faaz-nft
````

### Step 2: Install dependencies

Run the following command to install required dependencies:

```bash
npm install
```

### Step 3: Compile the smart contract

Compile the contract using Hardhat:

```bash
npx hardhat compile
```

### Step 4: Configure Ganache (local test network)

You can use [Ganache](https://www.trufflesuite.com/ganache) as a local blockchain for testing purposes.

1. Open Ganache.
2. Set the network to default or configure it based on your needs.
3. Note down the RPC server and port (usually `http://127.0.0.1:7545`).

### Step 5: Set up Hardhat for local testing

Ensure that your Hardhat configuration (`hardhat.config.js`) is set to use the local network. Here’s an example configuration:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      accounts: [`0x${YOUR_PRIVATE_KEY}`], // Replace with your private key
    },
  },
};
```

### Step 6: Run the tests

Run the tests to ensure everything is functioning properly:

```bash
npx hardhat test
```

This will execute the test cases in `test/FaazNFT.test.js` and check if your contract is behaving as expected.

---

## Contract Methods

### 1. **mint(amount, newuri, royaltyReceiver, royaltyFeeInBips)**

* Mints a new NFT token.
* **Parameters**:

  * `amount`: Number of tokens to mint.
  * `newuri`: URI pointing to the metadata (IPFS link).
  * `royaltyReceiver`: Address to receive royalties.
  * `royaltyFeeInBips`: Royalty percentage (in basis points, e.g., 500 = 5%).

### 2. **startAuction(tokenId, durationInSeconds)**

* Starts an auction for a given NFT token.
* **Parameters**:

  * `tokenId`: ID of the token to auction.
  * `durationInSeconds`: Duration of the auction in seconds.

### 3. **bid(tokenId)**

* Place a bid on a token during an active auction.
* **Parameters**:

  * `tokenId`: ID of the token being bid on.

### 4. **finalizeAuction(tokenId)**

* Finalizes the auction and transfers the token to the highest bidder.

### 5. **withdraw()**

* Allows the contract owner to withdraw the contract's balance.

---

## Testing

The following tests are included in the project:

* **Minting**: Verifies that minting works correctly with royalties and URI.
* **Auction**: Tests auction creation, bidding, and finalizing the auction with token transfer.
* **Refund**: Ensures the previous bidder is refunded when outbid.

Test edge cases like double bidding, insufficient balance, and more are handled.
