import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  AuctionBid,
  AuctionCreated,
  AuctionExtended,
  AuctionReservePriceUpdated,
  AuctionSettled,
  AuctionTimeBufferUpdated,
  GnarsV2AuctionHouse,
  InitializeCall,
  OGGnarClaimed,
} from "../generated/GnarsV2AuctionHouse/GnarsV2AuctionHouse"
import {
  Auction,
  AuctionHouse,
  Bid,
  Gnar,
  Gnarving,
  OgGnar,
} from "../generated/schema"
import { getOrCreateAccount } from "./helpers"

let gnarving: Gnarving | null // Use WebAssembly global due to lack of closure support https://www.assemblyscript.org/status.html#on-closures

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

  gnarving = Gnarving.load("GNARVING")

  if (gnarving == null) {
    const auction = GnarsV2AuctionHouse.bind(event.address)

    const initialAuctionDuration = auction.baseAuctionTime()
    const auctionsBetweenGnarvings = auction.timeDoublingCount()

    gnarving = new Gnarving("GNARVING")
    gnarving.initialAuctionDuration = initialAuctionDuration
    gnarving.auctionDuration = initialAuctionDuration
    gnarving.auctionsBetweenGnarvings = auctionsBetweenGnarvings
    gnarving.gnarvings = new BigInt(0)
  }

  if (gnarving.auctionsUntilNextGnarving.isZero()) {
    gnarving.auctionsUntilNextGnarving = gnarving.auctionsBetweenGnarvings
    gnarving.gnarvings = gnarving.gnarvings.plus(BigInt.fromI32(1))
    gnarving.auctionDuration = gnarving.auctionDuration.times(BigInt.fromI32(2))
  }

  gnarving.auctionsUntilNextGnarving = gnarving.auctionsUntilNextGnarving.minus(
    BigInt.fromI32(1)
  )

  gnarving.save()
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

export function handleAuctionExtended(event: AuctionExtended): void {
  let gnarId = event.params.gnarId.toString()

  let auction = Auction.load(gnarId)
  if (auction == null) {
    log.error(
      "[handleAuctionExtended] Auction not found for Gnar #{}. Hash: {}",
      [gnarId, event.transaction.hash.toHex()]
    )
    return
  }

  auction.endTime = event.params.endTime
  auction.save()
}

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

export function handleOGClaim(event: OGGnarClaimed): void {
  let ogGnarId = event.params.ogGnarId.toString()

  let ogGnar = OgGnar.load(ogGnarId)
  if (ogGnar == null) {
    log.error("[handleOGClaim] OG Gnard not found for id #{}. Hash: {}", [
      ogGnarId,
      event.transaction.hash.toHex(),
    ])
    return
  }

  ogGnar.wasClaimed = true
  ogGnar.save()
}

export function handleInitialize(call: InitializeCall): void {
  let auctionHouse = new AuctionHouse("AUCTION_HOUSE")
  auctionHouse.reservePrice = call.inputs._reservePrice
  auctionHouse.timeBuffer = call.inputs._timeBuffer
  auctionHouse.save()
}

export function handleAuctionReservePriceUpdated(
  event: AuctionReservePriceUpdated
): void {
  let auctionHouse = AuctionHouse.load("AUCTION_HOUSE")
  if (auctionHouse === null) {
    log.error("AUCTION_HOUSE not found. Tx: {}", [
      event.transaction.hash.toHex(),
    ])
    return
  }
  auctionHouse.reservePrice = event.params.reservePrice
  auctionHouse.save()
}

export function handleAuctionTimeBufferUpdated(
  event: AuctionTimeBufferUpdated
): void {
  let auctionHouse = AuctionHouse.load("AUCTION_HOUSE")
  if (auctionHouse === null) {
    log.error("AUCTION_HOUSE not found. Tx: {}", [
      event.transaction.hash.toHex(),
    ])
    return
  }
  auctionHouse.timeBuffer = event.params.timeBuffer
  auctionHouse.save()
}
