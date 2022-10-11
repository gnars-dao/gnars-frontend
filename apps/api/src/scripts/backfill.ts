import * as dotenv from "dotenv"
dotenv.config()

import { toDatetime } from "../utils"
import { prisma, v2AuctionHouse, v2Gnar } from "../constants"

const runBackfill = async () => {
  const gnarCreatedEvents = await v2Gnar.queryFilter(
    v2Gnar.filters.GnarCreated(),
    0,
    "latest"
  )

  const auctionCreatedEvents = await v2AuctionHouse.queryFilter(
    v2AuctionHouse.filters.AuctionCreated(),
    0,
    "latest"
  )

  const bidPlacedEvents = await v2AuctionHouse.queryFilter(
    v2AuctionHouse.filters.AuctionBid(),
    0,
    "latest"
  )

  const auctionSettledEvents = await v2AuctionHouse.queryFilter(
    v2AuctionHouse.filters.AuctionSettled(),
    0,
    "latest"
  )

  console.log("gnars", gnarCreatedEvents.length)
  console.log("auctions", auctionCreatedEvents.length)
  console.log("bidPlaced", bidPlacedEvents.length)
  console.log("settled", auctionSettledEvents.length)

  // await prisma.bid.deleteMany({})
  // await prisma.winner.deleteMany({})
  // await prisma.auction.deleteMany({})

  const gnarsFromAuctions = auctionCreatedEvents.map((a) => ({
    gnarId: a.args.gnarId.toNumber(),
    startTimestamp: toDatetime(a.args.startTimestamp.toNumber()),
    endTimestamp: toDatetime(a.args.endTimestamp.toNumber()),
  }))

  const gnarFromAuctionsCreateRes = await prisma.gnar.createMany({
    data: gnarsFromAuctions,
    skipDuplicates: true,
  })

  console.log("Gnars from Auctions created", gnarFromAuctionsCreateRes.count)

  const gnarsFromMint = gnarCreatedEvents.map((g) => ({
    gnarId: g.args.tokenId.toNumber(),
  }))

  const gnarFromMintCreateRes = await prisma.gnar.createMany({
    data: gnarsFromMint,
    skipDuplicates: true,
  })

  console.log("Gnars from Mint created", gnarFromMintCreateRes.count)

  const bids = bidPlacedEvents.map((b) => ({
    gnarId: b.args.gnarId.toNumber(),
    sender: b.args.sender,
    amount: b.args.value.toString(),
    timestamp: toDatetime(b.args.timestamp.toNumber()),
    transactionHash: b.transactionHash,
  }))

  const bidCreatedRes = await prisma.bid.createMany({
    data: bids,
    skipDuplicates: true,
  })

  console.log("Bids created", bidCreatedRes.count)

  const winners = auctionSettledEvents.map((a) => ({
    gnarId: a.args.gnarId.toNumber(),
    amount: a.args.amount.toString(),
    sender: a.args.winner,
    timestamp: toDatetime(a.args.timestamp.toNumber()),
  }))

  const winnerCreatedRes = await prisma.winner.createMany({
    data: winners,
    skipDuplicates: true,
  })

  console.log("Winners created", winnerCreatedRes.count)
}

runBackfill()
