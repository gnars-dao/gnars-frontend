// SPDX-License-Identifier: GPL-3.0

/// @title The Gnars auction house v2

/////////////////////////////////////
//                                 //
//                                 //
//    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    //
//    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    //
//    ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓    //
//    ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓    //
//    ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓    //
//    ▓▓▓▓▓     ░░░░░░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓     ░░░░░░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓     ░░░░░░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓          ░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓          ░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓          ░░░░░▓▓▓▓▓    //
//    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    //
//    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    //
//                                 //
//                                 //
/////////////////////////////////////

// SkateContractV2AuctionHouseV2 adds:
// - auction extensions
// - claiming of 2 GnarsV2 by each OGGnar

// LICENSE
// SkateContractV2AuctionHouseV2.sol is a modified version of Zora's AuctionHouse.sol:
// https://github.com/ourzora/auction-house/blob/54a12ec1a6cf562e49f0a4917990474b11350a2d/contracts/AuctionHouse.sol
//
// AuctionHouse.sol source code Copyright Zora licensed under the GPL-3.0 license.
// With modifications by Nounders DAO.
// With modifications by Gnars DAO.


pragma solidity 0.8.6;

import {PausableUpgradeable} from "./@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "./@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {OwnableUpgradeable} from "./@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IERC20} from "./@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721Enumerable} from "@openzeppelin/contracts/interfaces/IERC721Enumerable.sol";
import {UUPSUpgradeable} from "./@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ISkateContractV2AuctionHouseV2} from "./interfaces/ISkateContractV2AuctionHouseV2.sol";
import {ISkateContractV2} from "./interfaces/ISkateContractV2.sol";
import {IWETH} from "./interfaces/IWETH.sol";
import {Counters} from "./@openzeppelin/contracts/utils/Counters.sol";

contract SkateContractV2AuctionHouseV2 is
ISkateContractV2AuctionHouseV2,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    // og skate Address
    address public constant SKATE_OG_ADDRESS = 0x494715B2a3C75DaDd24929835B658a1c19bd4552;

    using Counters for Counters.Counter;

    // The Gnar ERC721 token contract
    ISkateContractV2 public gnars;

    // The address of the WETH contract
    address public weth;

    // The minimum price accepted in an auction
    uint256 public reservePrice;

    // The minimum percentage difference between the last bid amount and the current bid
    uint8 public minBidIncrementPercentage;

    // The time a base auction lasts
    uint256 public baseAuctionTime;

    // The number of auctions between time doubling
    uint256 public timeDoublingCount;

    // The number of started auctions
    Counters.Counter public auctionCounter;

    // The active auction
    ISkateContractV2AuctionHouseV2.Auction public auction;

    // skate address
    address public skate;

    // dao address
    address public dao;

    // v2 storage slots //

    // The minimum amount of time left in an auction after a new bid is created
    uint256 public timeBuffer;

    // Tracks which OG Gnars were used to claim Gnars
    mapping(uint256 => bool) public gnarsClaimedFor;

    /**
     * @notice Initialize the auction house and base contracts,
     * populate configuration values, and pause the contract.
     * @dev This function can only be called once.
     */
    function initialize(
        address _skate,
        address _dao,
        ISkateContractV2 _gnars,
        address _weth,
        uint256 _reservePrice,
        uint8 _minBidIncrementPercentage,
        uint256 _baseAuctionTime,
        uint256 _timeDoublingCount,
        uint256 _timeBuffer
    ) external initializer {
        __Pausable_init();
        __ReentrancyGuard_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        _pause();

        require(
            _skate != address(0) && _dao != address(0) && address(_gnars) != address(0) && _weth != address(0),
            "ZERO ADDRESS"
        );
        require(_reservePrice > 0, "Reserve price is zero");
        require(_minBidIncrementPercentage <= 100, "Min bid increment percentange too high");
        require(_baseAuctionTime > 0, "Base auction time is zero");
        require(_timeDoublingCount > 0, "Time doubling count is zero");

        skate = _skate;
        dao = _dao;
        gnars = _gnars;
        weth = _weth;
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        baseAuctionTime = _baseAuctionTime;
        timeDoublingCount = _timeDoublingCount;
        timeBuffer = _timeBuffer;
    }

    /**
     * @notice Settle the current auction, mint a new Gnar, and put it up for auction.
     */
    function settleCurrentAndCreateNewAuction() external override nonReentrant whenNotPaused {
        _settleAuction();
        _createAuction();
    }

    /**
     * @notice Settle the current auction.
     * @dev This function can only be called when the contract is paused.
     */
    function settleAuction() external override whenPaused nonReentrant {
        _settleAuction();
    }

    /**
     * @notice Create a bid for a Gnar, with a given amount.
     * @dev This contract only accepts payment in ETH.
     */
    function createBid(
        uint256 gnarId,
        uint8 skatePercent,
        uint8 daoPercent
    ) external payable override nonReentrant {
        ISkateContractV2AuctionHouseV2.Auction memory _auction = auction;

        require(_auction.gnarId == gnarId, "Gnar not up for auction");
        require(skatePercent + daoPercent == 100, "Sum of percents is not 100");
        require(block.timestamp < _auction.endTimestamp, "Auction expired");
        require(msg.value >= reservePrice, "Must send at least reservePrice");
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            "Must send more than last bid by minBidIncrementPercentage amount"
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            _safeTransferETHWithFallback(lastBidder, _auction.amount);
        }

        // Extend the auction if the bid was received within `timeBuffer` of the auction end time
        bool extended = _auction.endTimestamp - block.timestamp < timeBuffer;
        if (extended) {
            auction.endTimestamp = _auction.endTimestamp = block.timestamp + timeBuffer;
        }

        auction.amount = msg.value;
        auction.bidder = payable(msg.sender);
        auction.skatePercent = skatePercent;
        auction.daoPercent = daoPercent;

        emit AuctionBid(_auction.gnarId, msg.sender, msg.value, block.timestamp);
        if (extended) {
            emit AuctionExtended(_auction.gnarId, _auction.endTimestamp);
        }
    }

    /**
     * @notice Pause the Gnar auction house.
     * @dev This function can only be called by the owner when the
     * contract is unpaused. While no new auctions can be started when paused,
     * anyone can settle an ongoing auction.
     */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the Gnar auction house.
     * @dev This function can only be called by the owner when the
     * contract is paused. If required, this function will start a new auction.
     */
    function unpause() external override onlyOwner {
        _unpause();

        if (auction.startTimestamp == 0 || auction.settled) {
            _createAuction();
        }
    }

    /**
     * @notice Set the auction reserve price.
     * @dev Only callable by the owner.
     */
    function setReservePrice(uint256 _reservePrice) external override onlyOwner {
        reservePrice = _reservePrice;

        emit AuctionReservePriceUpdated(_reservePrice);
    }

    /**
     * @notice Set the auction minimum bid increment percentage.
     * @dev Only callable by the owner.
     */
    function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage) external override onlyOwner {
        minBidIncrementPercentage = _minBidIncrementPercentage;

        emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
    }

    /**
     * @notice Set skate and dao address
     */
    function setSkateDaoAddresses(address _skate, address _dao) external override onlyOwner {
        require(_skate != address(0) && _dao != address(0), "ZERO ADDRESS");
        skate = _skate;
        dao = _dao;

        emit SkateDaoAddressesUpdated(_skate, _dao);
    }

    /**
     * @notice Returns the number of seconds the current auction will last.
     */
    function remainingTime() external view override returns (uint256) {
        require(auction.endTimestamp >= block.timestamp, "No remaining time!");
        return auction.endTimestamp - block.timestamp;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @notice Create an auction.
     * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
     * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
     * catch the revert and pause this contract.
     */
    function _createAuction() internal {
        try gnars.mint() returns (uint256 gnarId) {
            uint256 startTimestamp = block.timestamp;
            uint256 endTimestamp = startTimestamp + baseAuctionTime * 2**(auctionCounter.current() / timeDoublingCount);

            auction = Auction({
                gnarId: gnarId,
                amount: 0,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp,
                bidder: payable(0),
                skatePercent: 50,
                daoPercent: 50,
                settled: false
            });

            auctionCounter.increment();

            emit AuctionCreated(gnarId, startTimestamp, endTimestamp, block.timestamp);
        } catch Error(string memory) {
            _pause();
        }
    }

    /**
     * @notice Settle an auction, finalizing the bid and paying out to the owner.
     * @dev If there are no bids, the Gnar is burned.
     */
    function _settleAuction() internal {
        ISkateContractV2AuctionHouseV2.Auction memory _auction = auction;

        require(_auction.startTimestamp != 0, "Auction hasn't begun");
        require(!_auction.settled, "Auction has already been settled");
        require(block.timestamp >= _auction.endTimestamp, "Auction hasn't completed");

        auction.settled = true;

        if (_auction.bidder == address(0)) {
            gnars.burn(_auction.gnarId);
        } else {
            gnars.transferFrom(address(this), _auction.bidder, _auction.gnarId);
        }

        if (_auction.amount > 0) {
            _safeTransferETHWithFallback(skate, (_auction.amount * _auction.skatePercent) / 100);
            _safeTransferETHWithFallback(dao, (_auction.amount * _auction.daoPercent) / 100);
        }

        emit AuctionSettled(_auction.gnarId, _auction.bidder, _auction.amount, block.timestamp);
    }

    /**
     * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     */
    function _safeTransferETHWithFallback(address to, uint256 amount) internal {
        if (!_safeTransferETH(to, amount)) {
            IWETH(weth).deposit{value: amount}();
            require(IERC20(weth).transfer(to, amount), "Transfer failed");
        }
    }

    /**
     * @notice Transfer ETH and return the success status.
     * @dev This function only forwards 30,000 gas to the callee.
     */
    function _safeTransferETH(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{value: value, gas: 30_000}(new bytes(0));
        return success;
    }

    /**
     * @notice Set the auction time buffer.
     * @dev Only callable by the owner.
     */
    function setTimeBuffer(uint256 _timeBuffer) external override onlyOwner {
        timeBuffer = _timeBuffer;

        emit AuctionTimeBufferUpdated(_timeBuffer);
    }

    /**
     * @notice Claim the 2 Gnars each OG Gnar is elligible to. Caller should be the owner of the OG Gnars
     * @dev Only callable by the owner.
     */
    function claimGnars(uint256[] calldata ogGnarIds) external override nonReentrant whenNotPaused {
        IERC721Enumerable ogGnars = IERC721Enumerable(SKATE_OG_ADDRESS);

        for (uint256 i=0; i < ogGnarIds.length; i++) {
            uint256 ogGnarId = ogGnarIds[i];
            require(msg.sender == ogGnars.ownerOf(ogGnarId), "Not owner of OG Gnar");
            require(gnarsClaimedFor[ogGnarId] != true, "OG Gnar already used to claim Gnars");

            gnarsClaimedFor[ogGnarId] = true;
            gnars.safeTransferFrom(address(this), msg.sender, gnars.mint());
            gnars.safeTransferFrom(address(this), msg.sender, gnars.mint());

            emit OGGnarClaimed(ogGnarId, block.timestamp);
        }
    }
}
