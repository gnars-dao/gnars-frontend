import { Bytes, log } from "@graphprotocol/graph-ts"
import { DelegateChanged, DelegateVotesChanged, GnarCreated, Transfer } from "../generated/GnarsV2Token/GnarsV2Token"
import { DelegationEvent, Gnar, Seed, TransferEvent } from "../generated/schema"
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from "./constants"
import { getGovernanceEntity, getOrCreateAccount, getOrCreateDelegate } from "./helpers"

export function handleGnarCreated(event: GnarCreated): void {
  let gnarId = event.params.tokenId.toString()

  let seed = new Seed(gnarId)
  seed.background = event.params.seed.background
  seed.body = event.params.seed.body
  seed.accessory = event.params.seed.accessory
  seed.head = event.params.seed.head
  seed.glasses = event.params.seed.glasses
  seed.save()

  let gnar = Gnar.load(gnarId)
  if (gnar == null) {
    log.error("[handleGnarCreated] Gnar #{} not found. Hash: {}", [gnarId, event.transaction.hash.toHex()])
    return
  }

  gnar.seed = seed.id
  gnar.save()
}

// Use WebAssembly global due to lack of closure support
let accountGnars: string[] = []

export function handleDelegateChanged(event: DelegateChanged): void {
  let tokenHolder = getOrCreateAccount(event.params.delegator.toHexString())
  let previousDelegate = getOrCreateDelegate(event.params.fromDelegate.toHexString())
  let newDelegate = getOrCreateDelegate(event.params.toDelegate.toHexString())
  accountGnars = tokenHolder.gnars

  tokenHolder.delegate = newDelegate.id
  tokenHolder.save()

  previousDelegate.tokenHoldersRepresentedAmount = previousDelegate.tokenHoldersRepresentedAmount - 1
  let previousGnarsRepresented = previousDelegate.gnarsRepresented // Re-assignment required to update array
  previousDelegate.gnarsRepresented = previousGnarsRepresented.filter((n) => !accountGnars.includes(n))
  newDelegate.tokenHoldersRepresentedAmount = newDelegate.tokenHoldersRepresentedAmount + 1
  let newGnarsRepresented = newDelegate.gnarsRepresented // Re-assignment required to update array
  for (let i = 0; i < accountGnars.length; i++) {
    newGnarsRepresented.push(accountGnars[i])
  }
  newDelegate.gnarsRepresented = newGnarsRepresented
  previousDelegate.save()
  newDelegate.save()

  // Log a transfer event for each Gnar
  for (let i = 0; i < accountGnars.length; i++) {
    let delegateChangedEvent = new DelegationEvent(event.transaction.hash.toHexString() + "_" + accountGnars[i])
    delegateChangedEvent.blockNumber = event.block.number
    delegateChangedEvent.blockTimestamp = event.block.timestamp
    delegateChangedEvent.gnar = accountGnars[i]
    delegateChangedEvent.previousDelegate = previousDelegate.id ? previousDelegate.id : tokenHolder.id
    delegateChangedEvent.newDelegate = newDelegate.id ? newDelegate.id : tokenHolder.id
    delegateChangedEvent.save()
  }
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let governance = getGovernanceEntity()
  let delegate = getOrCreateDelegate(event.params.delegate.toHexString())
  let votesDifference = event.params.newBalance.minus(event.params.previousBalance)

  delegate.delegatedVotesRaw = event.params.newBalance
  delegate.delegatedVotes = event.params.newBalance
  delegate.save()

  if (event.params.previousBalance == BIGINT_ZERO && event.params.newBalance > BIGINT_ZERO) {
    governance.currentDelegates = governance.currentDelegates.plus(BIGINT_ONE)
  }
  if (event.params.newBalance == BIGINT_ZERO) {
    governance.currentDelegates = governance.currentDelegates.minus(BIGINT_ONE)
  }
  governance.delegatedVotesRaw = governance.delegatedVotesRaw.plus(votesDifference)
  governance.delegatedVotes = governance.delegatedVotesRaw
  governance.save()
}

let transferredGnarId: string // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
  let fromHolder = getOrCreateAccount(event.params.from.toHexString())
  let toHolder = getOrCreateAccount(event.params.to.toHexString())
  let governance = getGovernanceEntity()
  transferredGnarId = event.params.tokenId.toString()

  let transferEvent = new TransferEvent(event.transaction.hash.toHexString() + "_" + transferredGnarId)
  transferEvent.blockNumber = event.block.number
  transferEvent.blockTimestamp = event.block.timestamp
  transferEvent.gnar = event.params.tokenId.toString()
  transferEvent.previousHolder = fromHolder.id.toString()
  transferEvent.newHolder = toHolder.id.toString()
  transferEvent.save()

  // fromHolder
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    governance.totalTokenHolders = governance.totalTokenHolders.plus(BIGINT_ONE)
    governance.save()
  } else {
    let fromHolderPreviousBalance = fromHolder.tokenBalanceRaw
    fromHolder.tokenBalanceRaw = fromHolder.tokenBalanceRaw.minus(BIGINT_ONE)
    fromHolder.tokenBalance = fromHolder.tokenBalanceRaw
    let fromHolderGnars = fromHolder.gnars // Re-assignment required to update array
    fromHolder.gnars = fromHolderGnars.filter((n) => n != transferredGnarId)

    if (fromHolder.delegate != null) {
      let fromHolderDelegate = getOrCreateDelegate(fromHolder.delegate as string)
      let fromHolderGnarsRepresented = fromHolderDelegate.gnarsRepresented // Re-assignment required to update array
      fromHolderDelegate.gnarsRepresented = fromHolderGnarsRepresented.filter((n) => n != transferredGnarId)
      fromHolderDelegate.save()
    }

    if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
      log.error("Negative balance on holder {} with balance {}", [fromHolder.id, fromHolder.tokenBalanceRaw.toString()])
    }

    if (fromHolder.tokenBalanceRaw == BIGINT_ZERO && fromHolderPreviousBalance > BIGINT_ZERO) {
      governance.currentTokenHolders = governance.currentTokenHolders.minus(BIGINT_ONE)
      governance.save()

      fromHolder.delegate = null
    } else if (fromHolder.tokenBalanceRaw > BIGINT_ZERO && fromHolderPreviousBalance == BIGINT_ZERO) {
      governance.currentTokenHolders = governance.currentTokenHolders.plus(BIGINT_ONE)
      governance.save()
    }

    fromHolder.save()
  }

  // toHolder
  if (event.params.to.toHexString() == ZERO_ADDRESS) {
    governance.totalTokenHolders = governance.totalTokenHolders.minus(BIGINT_ONE)
    governance.save()
  }

  let delegateChangedEvent = new DelegationEvent(
    event.transaction.hash.toHexString() + "_" + event.params.tokenId.toString()
  )
  delegateChangedEvent.blockNumber = event.block.number
  delegateChangedEvent.blockTimestamp = event.block.timestamp
  delegateChangedEvent.gnar = event.params.tokenId.toString()
  delegateChangedEvent.previousDelegate = fromHolder.delegate
    ? fromHolder.delegate!.toString()
    : fromHolder.id.toString()
  delegateChangedEvent.newDelegate = toHolder.delegate ? toHolder.delegate!.toString() : toHolder.id.toString()
  delegateChangedEvent.save()

  let toHolderDelegate = getOrCreateDelegate(toHolder.delegate ? toHolder.delegate! : toHolder.id)
  let toHolderGnarsRepresented = toHolderDelegate.gnarsRepresented // Re-assignment required to update array
  toHolderGnarsRepresented.push(transferredGnarId)
  toHolderDelegate.gnarsRepresented = toHolderGnarsRepresented
  toHolderDelegate.save()

  let toHolderPreviousBalance = toHolder.tokenBalanceRaw
  toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw.plus(BIGINT_ONE)
  toHolder.tokenBalance = toHolder.tokenBalanceRaw
  toHolder.totalTokensHeldRaw = toHolder.totalTokensHeldRaw.plus(BIGINT_ONE)
  toHolder.totalTokensHeld = toHolder.totalTokensHeldRaw
  let toHolderGnars = toHolder.gnars // Re-assignment required to update array
  toHolderGnars.push(event.params.tokenId.toString())
  toHolder.gnars = toHolderGnars

  if (toHolder.tokenBalanceRaw == BIGINT_ZERO && toHolderPreviousBalance > BIGINT_ZERO) {
    governance.currentTokenHolders = governance.currentTokenHolders.minus(BIGINT_ONE)
    governance.save()
  } else if (toHolder.tokenBalanceRaw > BIGINT_ZERO && toHolderPreviousBalance == BIGINT_ZERO) {
    governance.currentTokenHolders = governance.currentTokenHolders.plus(BIGINT_ONE)
    governance.save()

    toHolder.delegate = toHolder.id
  }

  let gnar = Gnar.load(transferredGnarId)
  if (gnar == null) {
    gnar = new Gnar(transferredGnarId)
  }

  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    gnar.creationTimestamp = event.block.timestamp
  }
  gnar.owner = toHolder.id
  gnar.hdOwner = Bytes.fromHexString(ZERO_ADDRESS)
  gnar.save()

  toHolder.save()
}
