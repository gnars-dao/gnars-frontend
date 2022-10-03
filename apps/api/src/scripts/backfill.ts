import * as dotenv from "dotenv"
dotenv.config()

import { toDatetime } from "../utils"
import { prisma, v2AuctionHouse } from "../constants"

const runBackfill = async () => {
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

  console.log("auctions", auctionCreatedEvents.length)
  console.log("bidPlaced", bidPlacedEvents.length)
  console.log("settled", auctionSettledEvents.length)

  // await prisma.bid.deleteMany({})
  // await prisma.winner.deleteMany({})
  // await prisma.auction.deleteMany({})

  const auctions = auctionCreatedEvents.map((a) => ({
    gnarId: a.args.gnarId.toNumber(),
    startTimestamp: toDatetime(a.args.startTimestamp.toNumber()),
    endTimestamp: toDatetime(a.args.endTimestamp.toNumber()),
  }))

  const auctionCreateRes = await prisma.auction.createMany({
    data: auctions,
    skipDuplicates: true,
  })

  console.log("Auctions created", auctionCreateRes.count)

  const bids = bidPlacedEvents.map((b) => ({
    gnarId: b.args.gnarId.toNumber(),
    sender: b.args.sender,
    amount: b.args.value.toString(),
    timestamp: toDatetime(b.args.timestamp.toNumber()),
    transactionHash: b.transactionHash,
    auctionId: b.args.gnarId.toNumber(),
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
    auctionId: a.args.gnarId.toNumber(),
  }))

  const winnerCreatedRes = await prisma.winner.createMany({
    data: winners,
    skipDuplicates: true,
  })

  console.log("Winners created", winnerCreatedRes.count)
}

runBackfill()
