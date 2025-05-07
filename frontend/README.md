# Faaz NFT Frontend

This is the frontend interface for the **Faaz NFT Marketplace**, which interacts with an ERC-1155 smart contract using **Web3.js**. It enables users to mint NFTs, view their assets, bid in auctions, and interact with the blockchain via MetaMask.

---

## 🚀 Features

- Connect to MetaMask wallet
- Mint single or batch NFTs (ERC-1155)
- Upload and fetch metadata (e.g., IPFS)
- View owned NFTs
- Participate in auctions (bid, outbid, settle)
- Admin dashboard (for creator/admin)
- Event-driven UI updates

---

## 🛠️ Tech Stack

- React.js
- Web3.js
- Bootstrap / Tailwind CSS
- IPFS (via Pinata SDK)
- Truffle / Ganache (backend testing)

---

## 📦 Installation

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/faaz-nft-frontend.git
   cd faaz-nft-frontend
```

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the root directory with your settings:

   ```env
   REACT_APP_CONTRACT_ADDRESS=0xYourContractAddress
   REACT_APP_NETWORK_ID=5777
   REACT_APP_PINATA_API_KEY=your_pinata_key
   REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret
   ```

---

## 🔧 Run Development Server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

Make sure you are running Ganache and have the smart contract deployed.

---

## 🧪 Testing the Frontend

To test wallet and contract interactions:

1. Start Ganache or a local blockchain node.
2. Deploy your smart contract using Truffle:

   ```bash
   truffle migrate --network development
   ```
3. Start the frontend:

   ```bash
   npm start
   ```

You should be able to:

* Connect your MetaMask wallet
* Mint NFTs
* View NFT list
* Place bids (for auctionable NFTs)
* See ownership updates in real-time

---

## 🧰 Folder Structure

```
faaz-nft-frontend/
├── public/
├── src/
│   ├── components/
│   ├── contracts/
│   ├── services/
│   ├── App.js
│   ├── web3.js
│   └── config.js
├── .env
├── package.json
└── README.md
```

---

## ✅ To-Do

* Add NFT detail view
* Enable real-time event logs
* Improve auction UI/UX
* Add wallet balance + history

