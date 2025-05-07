const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployContract } = require("@openzeppelin/test-helpers");

describe("FaazNFTMarketplace", function () {
    let nftMarketplace;
    let admin;
    let creator;
    let addr1;
    
    beforeEach(async () => {
        [admin, creator, addr1] = await ethers.getSigners();
        
        // Deploy the contract
        const FaazNFT = await ethers.getContractFactory("FaazNFTMarketplace");
        nftMarketplace = await FaazNFT.deploy();
        
        // Add creator (admin action)
        await nftMarketplace.addCreator(creator.address);
    });
    
    it("should allow creators to mint NFTs", async function () {
        const amount = 1;
        const uri = "ipfs://fakeuri";
        const royaltyReceiver = creator.address;
        const royaltyFee = 500; // 5%
        
        await expect(nftMarketplace.connect(creator).mintNFT(amount, uri, royaltyReceiver, royaltyFee))
            .to.emit(nftMarketplace, "Minted")
            .withArgs(creator.address, 1, uri, amount); // Assuming tokenId starts from 1
    });
    
    it("should not allow non-creators to mint NFTs", async function () {
        const amount = 1;
        const uri = "ipfs://fakeuri";
        const royaltyReceiver = creator.address;
        const royaltyFee = 500; // 5%
        
        await expect(nftMarketplace.connect(addr1).mintNFT(amount, uri, royaltyReceiver, royaltyFee))
            .to.be.revertedWith("Caller is not a creator");
    });
});
