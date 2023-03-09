import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
} from "../generated/GnarsV2AuctionHouse/GnarsV2AuctionHouse"
import { Auction, Bid, Gnar } from "../generated/schema"
import { getOrCreateAccount } from "./helpers"

export function handleAuctionCreated(event: AuctionCreated): void {
  let gnarId = event.params.gnarId.toString()

  let gnar = Gnar.load(gnarId)
  if (gnar == null) {
    log.error("[handleAuctionCreated] Gnar #{} not found. Hash: {}", [
      gnarId,
      event.transaction.hash.toHex(),
    ])
    return
  }

  let auction = new Auction(gnarId)
  auction.gnar = gnar.id
  auction.amount = BigInt.fromI32(0)
  auction.startTime = event.params.startTimestamp
  auction.endTime = event.params.endTimestamp
  auction.settled = false
  auction.save()

  gnar.auction = auction.id
  gnar.save()
}

export function handleAuctionBid(event: AuctionBid): void {
  let gnarId = event.params.gnarId.toString()
  let bidderAddress = event.params.sender.toHex()

  let bidder = getOrCreateAccount(bidderAddress)

  let auction = Auction.load(gnarId)
  if (auction == null) {
    log.error("[handleAuctionBid] Auction not found for Gnar #{}. Hash: {}", [
      gnarId,
      event.transaction.hash.toHex(),
    ])
    return
  }

  auction.amount = event.params.value
  auction.bidder = bidder.id
  auction.save()

  // Save Bid
  let bid = new Bid(event.transaction.hash.toHex())
  bid.bidder = bidder.id
  bid.amount = auction.amount
  bid.gnar = auction.gnar
  bid.txIndex = event.transaction.index
  bid.blockNumber = event.block.number
  bid.blockTimestamp = event.block.timestamp
  bid.auction = auction.id
  bid.save()
}

// export function handleAuctionExtended(event: AuctionExtended): void {
//   let gnarId = event.params.gnarId.toString();
//
//   let auction = Auction.load(gnarId);
//   if (auction == null) {
//     log.error('[handleAuctionExtended] Auction not found for Gnar #{}. Hash: {}', [
//       gnarId,
//       event.transaction.hash.toHex(),
//     ]);
//     return;
//   }
//
//   auction.endTime = event.params.endTime;
//   auction.save();
// }

export function handleAuctionSettled(event: AuctionSettled): void {
  let gnarId = event.params.gnarId.toString()

  let auction = Auction.load(gnarId)
  if (auction == null) {
    log.error(
      "[handleAuctionSettled] Auction not found for Gnar #{}. Hash: {}",
      [gnarId, event.transaction.hash.toHex()]
    )
    return
  }

  auction.settled = true
  auction.save()
}
