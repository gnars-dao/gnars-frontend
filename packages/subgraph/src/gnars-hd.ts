import { log } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/GnarsV2Token/GnarsV2Token"
import { Gnar } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let newOwner = event.params.to
  let hdGnarId = event.params.tokenId.toString()

  let gnar = Gnar.load(hdGnarId)
  if (gnar == null) {
    log.error("[handleGnarCreated] Gnar #{} not found. Hash: {}", [hdGnarId, event.transaction.hash.toHex()])
    return
  }

  gnar.hdOwner = newOwner
  gnar.save()
}
