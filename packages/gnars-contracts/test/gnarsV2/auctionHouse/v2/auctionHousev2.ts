import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import {} from "@nomicfoundation/hardhat-network-helpers"
// import { solidity } from "@nomiclabs"
import { constants } from "ethers"
import { ethers, upgrades } from "hardhat"
// import {
//   MaliciousBidder__factory as MaliciousBidderFactory,
//   NounsAuctionHouse,
//   NounsDescriptorV2__factory as NounsDescriptorV2Factory,
//   NounsToken,
//   WETH,
// } from "../typechain"
// import { deployNounsToken, deployWeth, populateDescriptorV2 } from "./utils"
import {
  SkateContractV2AuctionHouseV2,
  SkateContractV2AuctionHouse,
} from "../typechain-types"
import { IWETH } from "../typechain-types/gnarsV2/auctionHouse/v1/interfaces"
import { SkateContract } from "../typechain-types/gnarsOG"
import { SkateContractV2 } from "../typechain-types/gnarsV2/token"

describe("GnarsAuctionHouseV2", async () => {
  const gnarsAuctionHouseProxyAddress =
    "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"
  let gnarsAuctionHouseV2: SkateContractV2AuctionHouseV2
  const gnarsV2Token = await ethers
    .getContractFactory("SkateContractV2")
    .then((f) => f.attach("0x558BFFF0D583416f7C4e380625c7865821b8E95C"))
  const gnarsOgToken = await ethers
    .getContractFactory("SkateContract")
    .then((f) => f.attach("0x494715B2a3C75DaDd24929835B658a1c19bd4552"))
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  let deployer: SignerWithAddress
  let gnarsDAO: SignerWithAddress
  let bidderA: SignerWithAddress
  let bidderB: SignerWithAddress
  let snapshotId: number

  const TIME_BUFFER = 15 * 60
  const RESERVE_PRICE = 2
  const MIN_INCREMENT_BID_PERCENTAGE = 5
  const DURATION = 60 * 60 * 24

  // before(async () => {
  //   ;[deployer, gnarsDAO, bidderA, bidderB] = await ethers.getSigners()
  //
  //   nounsToken = await deployNounsToken(
  //     deployer,
  //     noundersDAO.address,
  //     deployer.address
  //   )
  //   weth = await deployWeth(deployer)
  //   gnarsAuctionHouseV2 = await deploy(deployer)
  //
  //   const descriptor = await nounsToken.descriptor()
  //
  //   await populateDescriptorV2(
  //     NounsDescriptorV2Factory.connect(descriptor, deployer)
  //   )
  //
  //   await nounsToken.setMinter(gnarsAuctionHouseV2.address)
  // })

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", [])
  })

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId])
  })

  it("should be a valid UUPS implementation", async () => {
    const auctionHouseV2Factory = await ethers.getContractFactory(
      "SkateContractV2AuctionHouseV2",
      deployer
    )

    expect(false).to.be.true

    await expect(
      upgrades.validateImplementation(auctionHouseV2Factory, {
        kind: "beacon",
      })
    ).to.be.false
  })

  // it("should revert if a second initialization is attempted", async () => {
  //   const tx = gnarsAuctionHouseV2.initialize(
  //     nounsToken.address,
  //     weth.address,
  //     TIME_BUFFER,
  //     RESERVE_PRICE,
  //     MIN_INCREMENT_BID_PERCENTAGE,
  //     DURATION
  //   )
  //   await expect(tx).to.be.revertedWith(
  //     "Initializable: contract is already initialized"
  //   )
  // })
  //
  // it("should allow the noundersDAO to unpause the contract and create the first auction", async () => {
  //   const tx = await gnarsAuctionHouseV2.unpause()
  //   await tx.wait()
  //
  //   const auction = await gnarsAuctionHouseV2.auction()
  //   expect(auction.startTime.toNumber()).to.be.greaterThan(0)
  // })
  //
  // it("should revert if a user creates a bid for an inactive auction", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   const tx = gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId.add(1), {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await expect(tx).to.be.revertedWith("Noun not up for auction")
  // })
  //
  // it("should revert if a user creates a bid for an expired auction", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   await ethers.provider.send("evm_increaseTime", [60 * 60 * 25]) // Add 25 hours
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   const tx = gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await expect(tx).to.be.revertedWith("Auction expired")
  // })
  //
  // it("should revert if a user creates a bid with an amount below the reserve price", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   const tx = gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE - 1,
  //   })
  //
  //   await expect(tx).to.be.revertedWith("Must send at least reservePrice")
  // })
  //
  // it("should revert if a user creates a bid less than the min bid increment percentage", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE * 50,
  //   })
  //   const tx = gnarsAuctionHouseV2.connect(bidderB).createBid(gnarId, {
  //     value: RESERVE_PRICE * 51,
  //   })
  //
  //   await expect(tx).to.be.revertedWith(
  //     "Must send more than last bid by minBidIncrementPercentage amount"
  //   )
  // })
  //
  // it("should refund the previous bidder when the following user creates a bid", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   const bidderAPostBidBalance = await bidderA.getBalance()
  //   await gnarsAuctionHouseV2.connect(bidderB).createBid(gnarId, {
  //     value: RESERVE_PRICE * 2,
  //   })
  //   const bidderAPostRefundBalance = await bidderA.getBalance()
  //
  //   expect(bidderAPostRefundBalance).to.equal(
  //     bidderAPostBidBalance.add(RESERVE_PRICE)
  //   )
  // })
  //
  // it("should cap the maximum bid griefing cost at 30K gas + the cost to wrap and transfer WETH", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   const maliciousBidderFactory = new MaliciousBidderFactory(bidderA)
  //   const maliciousBidder = await maliciousBidderFactory.deploy()
  //
  //   const maliciousBid = await maliciousBidder
  //     .connect(bidderA)
  //     .bid(gnarsAuctionHouseV2.address, gnarId, {
  //       value: RESERVE_PRICE,
  //     })
  //   await maliciousBid.wait()
  //
  //   const tx = await gnarsAuctionHouseV2.connect(bidderB).createBid(gnarId, {
  //     value: RESERVE_PRICE * 2,
  //     gasLimit: 1_000_000,
  //   })
  //   const result = await tx.wait()
  //
  //   expect(result.gasUsed.toNumber()).to.be.lessThan(200_000)
  //   expect(await weth.balanceOf(maliciousBidder.address)).to.equal(
  //     RESERVE_PRICE
  //   )
  // })
  //
  // it("should emit an `AuctionBid` event on a successful bid", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //   const tx = gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await expect(tx)
  //     .to.emit(gnarsAuctionHouseV2, "AuctionBid")
  //     .withArgs(gnarId, bidderA.address, RESERVE_PRICE, false)
  // })
  //
  // it("should emit an `AuctionExtended` event if the auction end time is within the time buffer", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId, endTime } = await gnarsAuctionHouseV2.auction()
  //
  //   await ethers.provider.send("evm_setNextBlockTimestamp", [
  //     endTime.sub(60 * 5).toNumber(),
  //   ]) // Subtract 5 mins from current end time
  //
  //   const tx = gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await expect(tx)
  //     .to.emit(gnarsAuctionHouseV2, "AuctionExtended")
  //     .withArgs(gnarId, endTime.add(60 * 10))
  // })
  //
  // it("should revert if auction settlement is attempted while the auction is still active", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //   const tx = gnarsAuctionHouseV2
  //     .connect(bidderA)
  //     .settleCurrentAndCreateNewAuction()
  //
  //   await expect(tx).to.be.revertedWith("Auction hasn't completed")
  // })
  //
  // it("should emit `AuctionSettled` and `AuctionCreated` events if all conditions are met", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await ethers.provider.send("evm_increaseTime", [60 * 60 * 25]) // Add 25 hours
  //   const tx = await gnarsAuctionHouseV2
  //     .connect(bidderA)
  //     .settleCurrentAndCreateNewAuction()
  //
  //   const receipt = await tx.wait()
  //   const { timestamp } = await ethers.provider.getBlock(receipt.blockHash)
  //
  //   const settledEvent = receipt.events?.find(
  //     (e) => e.event === "AuctionSettled"
  //   )
  //   const createdEvent = receipt.events?.find(
  //     (e) => e.event === "AuctionCreated"
  //   )
  //
  //   expect(settledEvent?.args?.gnarId).to.equal(gnarId)
  //   expect(settledEvent?.args?.winner).to.equal(bidderA.address)
  //   expect(settledEvent?.args?.amount).to.equal(RESERVE_PRICE)
  //
  //   expect(createdEvent?.args?.gnarId).to.equal(gnarId.add(1))
  //   expect(createdEvent?.args?.startTime).to.equal(timestamp)
  //   expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION)
  // })
  //
  // it("should not create a new auction if the auction house is paused and unpaused while an auction is ongoing", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   await (await gnarsAuctionHouseV2.pause()).wait()
  //
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   expect(gnarId).to.equal(1)
  // })
  //
  // it("should create a new auction if the auction house is paused and unpaused after an auction is settled", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await ethers.provider.send("evm_increaseTime", [60 * 60 * 25]) // Add 25 hours
  //
  //   await (await gnarsAuctionHouseV2.pause()).wait()
  //
  //   const settleTx = gnarsAuctionHouseV2.connect(bidderA).settleAuction()
  //
  //   await expect(settleTx)
  //     .to.emit(gnarsAuctionHouseV2, "AuctionSettled")
  //     .withArgs(gnarId, bidderA.address, RESERVE_PRICE)
  //
  //   const unpauseTx = await gnarsAuctionHouseV2.unpause()
  //   const receipt = await unpauseTx.wait()
  //   const { timestamp } = await ethers.provider.getBlock(receipt.blockHash)
  //
  //   const createdEvent = receipt.events?.find(
  //     (e) => e.event === "AuctionCreated"
  //   )
  //
  //   expect(createdEvent?.args?.gnarId).to.equal(gnarId.add(1))
  //   expect(createdEvent?.args?.startTime).to.equal(timestamp)
  //   expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION)
  // })
  //
  // it("should settle the current auction and pause the contract if the minter is updated while the auction house is unpaused", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   await gnarsAuctionHouseV2.connect(bidderA).createBid(gnarId, {
  //     value: RESERVE_PRICE,
  //   })
  //
  //   await nounsToken.setMinter(constants.AddressZero)
  //
  //   await ethers.provider.send("evm_increaseTime", [60 * 60 * 25]) // Add 25 hours
  //
  //   const settleTx = gnarsAuctionHouseV2
  //     .connect(bidderA)
  //     .settleCurrentAndCreateNewAuction()
  //
  //   await expect(settleTx)
  //     .to.emit(gnarsAuctionHouseV2, "AuctionSettled")
  //     .withArgs(gnarId, bidderA.address, RESERVE_PRICE)
  //
  //   const paused = await gnarsAuctionHouseV2.paused()
  //
  //   expect(paused).to.equal(true)
  // })
  //
  // it("should burn a Noun on auction settlement if no bids are received", async () => {
  //   await (await gnarsAuctionHouseV2.unpause()).wait()
  //
  //   const { gnarId } = await gnarsAuctionHouseV2.auction()
  //
  //   await ethers.provider.send("evm_increaseTime", [60 * 60 * 25]) // Add 25 hours
  //
  //   const tx = gnarsAuctionHouseV2
  //     .connect(bidderA)
  //     .settleCurrentAndCreateNewAuction()
  //
  //   await expect(tx)
  //     .to.emit(gnarsAuctionHouseV2, "AuctionSettled")
  //     .withArgs(gnarId, "0x0000000000000000000000000000000000000000", 0)
  // })
})
