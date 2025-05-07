const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FaazNFTMarketplace", function () {
  let nftContract, owner, addr1, addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("FaazNFTMarketplace");
    nftContract = await NFT.deploy();
    await nftContract.deployed();
  });

  it("should mint a token with correct URI and royalty", async () => {
    await nftContract.mint(
      5,
      "ipfs://example/metadata.json",
      addr1.address,
      500 // 5%
    );

    expect(await nftContract.uri(1)).to.equal("ipfs://example/metadata.json");

    const royaltyInfo = await nftContract.royaltyInfo(1, 10000);
    expect(royaltyInfo[0]).to.equal(addr1.address);
    expect(royaltyInfo[1]).to.equal(500);
  });

  it("should start auction and accept a valid bid", async () => {
    await nftContract.mint(1, "ipfs://x", addr1.address, 300);
    await nftContract.startAuction(1, 60); // 60 sec

    await nftContract.connect(addr1).bid(1, { value: ethers.utils.parseEther("1.0") });
    const auction = await nftContract.auctions(1);

    expect(auction.highestBidder).to.equal(addr1.address);
  });

  it("should refund previous bidder if outbid", async () => {
    await nftContract.mint(1, "ipfs://x", addr1.address, 300);
    await nftContract.startAuction(1, 60);

    await nftContract.connect(addr1).bid(1, { value: ethers.utils.parseEther("1.0") });

    await expect(
      nftContract.connect(addr2).bid(1, { value: ethers.utils.parseEther("1.5") })
    ).to.changeEtherBalances(
      [addr1, addr2],
      [ethers.utils.parseEther("1.0"), ethers.utils.parseEther("-1.5")]
    );
  });

  it("should finalize auction and transfer token", async () => {
    await nftContract.mint(1, "ipfs://x", addr1.address, 300);
    await nftContract.startAuction(1, 1); // 1 sec

    await nftContract.connect(addr1).bid(1, { value: ethers.utils.parseEther("1.0") });

    // wait for auction to end
    await new Promise(r => setTimeout(r, 1100));
    await nftContract.finalizeAuction(1);

    expect(await nftContract.balanceOf(addr1.address, 1)).to.equal(1);
  });
});
