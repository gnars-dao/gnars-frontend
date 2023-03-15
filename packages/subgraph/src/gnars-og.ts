import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
  GnarsOG,
  Transfer,
} from "../generated/GnarsOG/GnarsOG"
import { ZERO_ADDRESS } from "./constants"
import { OgAuction, OgBid, OgGnar, OgTransferEvent } from "../generated/schema"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"

export function handleTransfer(event: Transfer): void {
  let transferredGnarId = event.params.tokenId.toString()

  let transferEvent = new OgTransferEvent(
    event.transaction.hash.toHexString() + "_" + transferredGnarId
  )
  transferEvent.blockNumber = event.block.number
  transferEvent.blockTimestamp = event.block.timestamp
  transferEvent.gnar = event.params.tokenId.toString()
  transferEvent.previousHolder = event.params.from
  transferEvent.newHolder = event.params.to
  transferEvent.save()

  const minted = event.params.from.toHexString() == ZERO_ADDRESS

  let ogGnar = OgGnar.load(transferredGnarId)

  if (minted) {
    const gnarsOg = GnarsOG.bind(event.address)
    const seed = gnarsOg.seeds(event.params.tokenId)

    ogGnar = new OgGnar(transferredGnarId)
    ogGnar.body = seed.getBody()
    ogGnar.accessory = seed.getAccessory()
    ogGnar.background = seed.getBackground()
    ogGnar.head = seed.getHead()
    ogGnar.glasses = seed.getGlasses()
    ogGnar.wasClaimed = false
  }

  ogGnar!.owner = event.params.to
  ogGnar!.save()
}

export function handleAuctionCreated(event: AuctionCreated): void {
  let gnarId = event.params.gnarId.toString()

  const gnarsOG = GnarsOG.bind(event.address)
  const auctionData = gnarsOG.auction()

  let auction = new OgAuction(gnarId)
  auction.gnar = event.params.gnarId.toString()
  auction.amount = BigInt.fromI32(0)
  auction.startBlock = event.params._event.block.number
  auction.endBlock = auctionData.getEndBlock()
  auction.settled = false
  auction.bidder = Address.fromString(ZERO_ADDRESS)
  auction.save()
}

export function handleAuctionBid(event: AuctionBid): void {
  let gnarId = event.params.gnarId.toString()

  let auction = OgAuction.load(gnarId)
  if (auction == null) {
    log.error("[handleAuctionBid] Auction not found for Gnar #{}. Hash: {}", [
      gnarId,
      event.transaction.hash.toHex(),
    ])
    return
  }

  auction.amount = event.params.value
  auction.bidder = event.params.sender
  auction.save()

  // Save Bid
  let bid = new OgBid(event.transaction.hash.toHex())
  bid.bidder = auction.bidder
  bid.amount = auction.amount
  bid.gnar = auction.gnar
  bid.txIndex = event.transaction.index
  bid.blockNumber = event.block.number
  bid.blockTimestamp = event.block.timestamp
  bid.auction = auction.id
  bid.save()
}

export function handleAuctionSettled(event: AuctionSettled): void {
  let gnarId = event.params.gnarId.toString()

  let auction = OgAuction.load(gnarId)
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
