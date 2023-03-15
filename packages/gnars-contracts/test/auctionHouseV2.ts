import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {expect} from "chai"
import {impersonateAccount, time,} from "@nomicfoundation/hardhat-network-helpers"
import {utils} from "ethers"
import {ethers, upgrades} from "hardhat"
import {SkateContractV2AuctionHouse, SkateContractV2AuctionHouseV2,} from "../typechain-types"
import {SkateContractV2} from "../typechain-types/gnarsV2/token"

describe("GnarsAuctionHouseV2", () => {
  const gnarsAuctionHouseProxyAddress =
    "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"
  let gnarsV2Token: SkateContractV2
  let deployer: SignerWithAddress
  let gami: SignerWithAddress
  let gnarsDAO: SignerWithAddress
  let bidderA: SignerWithAddress
  let bidderB: SignerWithAddress
  let randomWallet: SignerWithAddress
  let snapshotId: number

  const getAuctionHouseV2 = async (wallet?: SignerWithAddress) => {
    const auctionHouseV1Factory = await ethers.getContractFactory(
      "SkateContractV2AuctionHouse",
      gami
    )

    const auctionHouseV2Factory = await ethers.getContractFactory(
      "SkateContractV2AuctionHouseV2",
      gami
    )

    await upgrades.forceImport(
      gnarsAuctionHouseProxyAddress,
      auctionHouseV1Factory,
      { kind: "uups" }
    )

    await impersonateAccount(gami.address)

    await upgrades.upgradeProxy(
      gnarsAuctionHouseProxyAddress,
      auctionHouseV2Factory,
      {
        kind: "uups",
        call: { fn: "setTimeBuffer", args: [90] },
      }
    )

    const auctionHouseV2 = auctionHouseV2Factory.attach(
      gnarsAuctionHouseProxyAddress
    )

    return wallet ? auctionHouseV2.connect(wallet) : auctionHouseV2
  }

  before(async () => {
    ;[deployer, gnarsDAO, bidderA, bidderB, randomWallet] =
      await ethers.getSigners()
    gnarsV2Token = await ethers
      .getContractFactory("SkateContractV2")
      .then((f) => f.attach("0x558BFFF0D583416f7C4e380625c7865821b8E95C"))

    gami = await ethers.getSigner("0x387a161C6b25aA854100aBaED39274e51aaffffd")
  })

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", [])
  })

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId])
  })

  it("should keep the old auction house state", async () => {
    const auctionHouseV1Factory = await ethers.getContractFactory(
      "SkateContractV2AuctionHouse",
      gami
    )

    const auctionHouseV1 = auctionHouseV1Factory.attach(
      gnarsAuctionHouseProxyAddress
    )

    const previousState = await Promise.all([
      auctionHouseV1.dao(),
      auctionHouseV1.auction(),
      auctionHouseV1.auctionCounter(),
      auctionHouseV1.baseAuctionTime(),
      auctionHouseV1.gnars(),
      auctionHouseV1.minBidIncrementPercentage(),
      auctionHouseV1.owner(),
      auctionHouseV1.reservePrice(),
      auctionHouseV1.skate(),
      auctionHouseV1.timeDoublingCount(),
      auctionHouseV1.weth(),
    ])
    const auctionHouseV2 = await getAuctionHouseV2()

    const newState = await Promise.all([
      auctionHouseV2.dao(),
      auctionHouseV2.auction(),
      auctionHouseV2.auctionCounter(),
      auctionHouseV2.baseAuctionTime(),
      auctionHouseV2.gnars(),
      auctionHouseV2.minBidIncrementPercentage(),
      auctionHouseV2.owner(),
      auctionHouseV2.reservePrice(),
      auctionHouseV2.skate(),
      auctionHouseV2.timeDoublingCount(),
      auctionHouseV2.weth(),
    ])

    expect(newState).to.deep.equal(previousState)

    expect(await auctionHouseV2.timeBuffer()).to.equal("90")
  })

  describe("OG Gnars claiming", () => {
    it("should not allow wallets other than the OG Gnar holder to claim the Gnars", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(randomWallet)
      await expect(auctionHouseV2.claimGnars([0])).to.be.revertedWith(
        "Not owner of OG Gnar"
      )
    })

    it("should allow Gami to claim for a single OG Gnar", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      const initialAmountOfGnars = await gnarsV2Token.balanceOf(gami.address)

      await auctionHouseV2.claimGnars([53])

      expect(await gnarsV2Token.balanceOf(gami.address)).to.be.equal(
        initialAmountOfGnars.add(2)
      )
    })

    it("should allow Gami to claim for all of his OG Gnars at once", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      const initialAmountOfGnars = await gnarsV2Token.balanceOf(gami.address)

      await auctionHouseV2.claimGnars([53, 462, 478, 539, 613, 623])

      expect(await gnarsV2Token.balanceOf(gami.address)).to.be.equal(
        initialAmountOfGnars.add(12)
      )
    })

    it("should emit on OGGnarClaimed event for each OG Gnar claimed", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)

      const timestamp = Math.floor(12 + Date.now() / 1000)
      time.setNextBlockTimestamp(timestamp)

      await expect(auctionHouseV2.claimGnars([53, 462]))
        .to.emit(auctionHouseV2, "OGGnarClaimed")
        .withArgs(53, timestamp)
        .and.to.emit(auctionHouseV2, "OGGnarClaimed")
        .withArgs(462, timestamp)
    })

    it("should not allow Gami to claim for the same OG Gnar twice", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      await auctionHouseV2.claimGnars([53])

      await expect(auctionHouseV2.claimGnars([462, 53])).to.be.revertedWith(
        "OG Gnar already used to claim Gnars"
      )
    })

    it("should not affect the gnarving counter", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      const initialAuctionCounter = await auctionHouseV2.auctionCounter()

      await auctionHouseV2.claimGnars([53])

      expect(await auctionHouseV2.auctionCounter()).to.be.equal(
        initialAuctionCounter
      )
    })
  })

  describe("Auction extensions", () => {
    it("should extend auctions to timeBuffer duration if there's less than the timeBuffer time left", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      await auctionHouseV2.settleCurrentAndCreateNewAuction()
      const { gnarId, endTimestamp } = await auctionHouseV2.auction()
      const bidTimestamp = endTimestamp.sub(1)
      await time.setNextBlockTimestamp(bidTimestamp)
      const {} = await auctionHouseV2
        .createBid(gnarId, 50, 50, {
          value: utils.parseEther("0.1"),
        })
        .then((t) => t.wait())
      const { endTimestamp: newEndTimestamp } = await auctionHouseV2.auction()

      expect(newEndTimestamp).to.be.equal(bidTimestamp.add(90))
    })

    it("should emit an AuctionExtended event when auction is extended", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      await auctionHouseV2.settleCurrentAndCreateNewAuction()
      const { gnarId, endTimestamp } = await auctionHouseV2.auction()
      const bidTimestamp = endTimestamp.sub(1)
      await time.setNextBlockTimestamp(bidTimestamp)
      await expect(
        auctionHouseV2.createBid(gnarId, 50, 50, {
          value: utils.parseEther("0.1"),
        })
      )
        .to.emit(auctionHouseV2, "AuctionExtended")
        .withArgs(gnarId, bidTimestamp.add(90))
    })

    it("should not extend auctions if there's more than the timeBuffer time left", async () => {
      const auctionHouseV2 = await getAuctionHouseV2(gami)
      await auctionHouseV2.settleCurrentAndCreateNewAuction()
      const { gnarId, endTimestamp } = await auctionHouseV2.auction()
      const bidTimestamp = endTimestamp.sub(91)
      await time.setNextBlockTimestamp(bidTimestamp)
      await auctionHouseV2
        .createBid(gnarId, 50, 50, {
          value: utils.parseEther("0.1"),
        })
        .then((t) => t.wait())
      const { endTimestamp: newEndTimestamp } = await auctionHouseV2.auction()

      expect(newEndTimestamp).to.be.equal(endTimestamp)
    })
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
