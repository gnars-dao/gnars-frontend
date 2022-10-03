import { prisma, v2AuctionHouse } from "./constants"
import { toDatetime } from "./utils"

export const startWorker = () => {
  console.log("Worker Starting")
  v2AuctionHouse.on(
    v2AuctionHouse.filters.AuctionCreated(),
    async (gnarId, startTimestamp, endTimestamp) => {
      console.log("Auction Created")
      const auctionCreateRes = await prisma.auction.create({
        data: {
          gnarId: gnarId.toNumber(),
          startTimestamp: toDatetime(startTimestamp.toNumber()),
          endTimestamp: toDatetime(endTimestamp.toNumber()),
        },
      })

      console.log(auctionCreateRes)
    }
  )

  v2AuctionHouse.on(
    v2AuctionHouse.filters.AuctionBid(),
    async (gnarId, sender, value, timestamp, event) => {
      console.log("Bid")
      const bidRes = await prisma.bid.create({
        data: {
          gnarId: gnarId.toNumber(),
          sender: sender,
          amount: value.toString(),
          timestamp: toDatetime(timestamp.toNumber()),
          transactionHash: event.transactionHash,
          auctionId: gnarId.toNumber(),
        },
      })

      console.log(bidRes)
    }
  )

  v2AuctionHouse.on(
    v2AuctionHouse.filters.AuctionSettled(),
    async (gnarId, winner, amount, timestamp, event) => {
      console.log("Settled")
      const winnerRes = await prisma.winner.create({
        data: {
          gnarId: gnarId.toNumber(),
          sender: winner,
          amount: amount.toString(),
          timestamp: toDatetime(timestamp.toNumber()),
          auctionId: gnarId.toNumber(),
        },
      })

      console.log(winnerRes)
    }
  )
}
