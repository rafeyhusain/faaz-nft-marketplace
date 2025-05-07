// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract FaazNFTMarketplace is ERC1155, ERC2981, Ownable, ReentrancyGuard {
    uint256 public currentTokenId = 1;

    struct Auction {
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        bool active;
    }

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => Auction) public auctions;

    constructor() ERC1155("") {}

    // Mint a new token (with royalty)
    function mint(
        uint256 amount,
        string memory newuri,
        address royaltyReceiver,
        uint96 royaltyFeeInBips
    ) external onlyOwner {
        uint256 tokenId = currentTokenId;
        _mint(msg.sender, tokenId, amount, "");
        _tokenURIs[tokenId] = newuri;
        _setTokenRoyalty(tokenId, royaltyReceiver, royaltyFeeInBips);
        currentTokenId++;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Start an auction for a token
    function startAuction(uint256 tokenId, uint256 durationInSeconds) external onlyOwner {
        auctions[tokenId] = Auction({
            highestBidder: address(0),
            highestBid: 0,
            endTime: block.timestamp + durationInSeconds,
            active: true
        });
    }

    // Bid on token
    function bid(uint256 tokenId) external payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");

        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid); // Refund
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    // End auction and transfer token
    function finalizeAuction(uint256 tokenId) external onlyOwner {
        Auction storage auction = auctions[tokenId];
        require(block.timestamp >= auction.endTime, "Auction not over");
        require(auction.active, "Already finalized");

        auction.active = false;

        if (auction.highestBidder != address(0)) {
            safeTransferFrom(msg.sender, auction.highestBidder, tokenId, 1, "");
        }
    }

    // Withdraw contract balance (owner)
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Royalty support interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
