import { BigNumber, ethers } from "ethers"
import sharp from "sharp"
import { isError, tryF } from "ts-try"
import { gnarsTokenContract, jsonRpcProvider, nnsProvider } from "./clients"
import { Bid, Proposal, TokenMetadata, Vote, VoteDirection } from "./types"
import { extractProposalTitle } from "./utils/proposals"

const shortAddress = (address: string) =>
  `${address.substr(0, 4)}...${address.substr(address.length - 4)}`

const voteDirectionToText = (direction: VoteDirection) => {
  const map = {
    [VoteDirection.FOR]: "for",
    [VoteDirection.AGAINST]: "against",
    [VoteDirection.ABSTAIN]: "to abstain on",
  }
  return map[direction]
}

/**
 * Try to reverse resolve an NNS domain, with fallback to a ENS domain
 * and return it for display.
 * If no result truncate the address and return it
 * @param address The address to ENS lookup or format
 * @returns The resolved NNS name, ENS name or a formatted address
 */
export const resolveNnsWithEnsOrShortAddressFallback = async (
  address: string
) =>
  await Promise.all([
    nnsProvider.lookupAddress(address),
    jsonRpcProvider.lookupAddress(address),
  ]).then(([nnsName, ensName]) => nnsName ?? ensName ?? shortAddress(address))

/**
 * Get tweet text for auction started.
 * @param auctionId The started auction id.
 * @param durationSeconds The duration of the auction in seconds.
 * @returns Text to be used in tweet when auction starts.
 */
export function formatAuctionStartedTweetText(auctionId: number) {
  return `＊Bleep Bloop Blop＊

 An auction has started for Gnar #${auctionId}
 Learn more at https://gnars.wtf`
}

/**
 * Get the formatted text for a new bid.
 * @param id The auction/gnar id
 * @param bid The amount of the current bid
 * @returns The bid update tweet text
 */
export async function formatBidMessageText(id: number, bid: Bid) {
  const bidder = await resolveNnsWithEnsOrShortAddressFallback(bid.bidder.id)
  return `Gnar ${id} has received a bid of Ξ${ethers.utils.formatEther(
    bid.amount
  )} from ${bidder}`
}

/**
 * Get the tweet text for an auction ending soon.
 * @returns The auction ending soon text
 */
export function getAuctionEndingSoonTweetText() {
  return `This auction is ending soon! Bid now at https://gnars.wtf`
}

export function formatNewGovernanceProposalText(proposal: Proposal) {
  return `A new Gnars DAO proposal (#${
    proposal.id
  }) has been created: ${extractProposalTitle(proposal)}`
}

export function formatUpdatedGovernanceProposalStatusText(proposal: Proposal) {
  return `Gnars DAO proposal #${proposal.id} (${extractProposalTitle(
    proposal
  )}) has changed to status: ${proposal.status.toLocaleLowerCase()}`
}

export function formatProposalAtRiskOfExpiryText(proposal: Proposal) {
  return `Gnars DAO proposal #${proposal.id} (${extractProposalTitle(
    proposal
  )}) expires in less than two days. Please execute it immediately!`
}

export async function formatNewGovernanceVoteText(
  proposal: Proposal,
  vote: Vote
) {
  return `${await resolveNnsWithEnsOrShortAddressFallback(
    vote.voter.id
  )} has voted ${voteDirectionToText(vote.supportDetailed)} Proposal #${
    proposal.id
  } (${extractProposalTitle(proposal)})${
    vote.reason ? `\n\nReason: ${vote.reason}` : ""
  }`
}

/**
 * Get the PNG buffer data of an Gnar
 * @param tokenId The ERC721 token id
 * @returns The png buffer of the Gnar or undefined
 */
export async function getGnarPngBuffer(
  tokenId: string
): Promise<Buffer | undefined> {
  const dataURI = await tryF(() => gnarsTokenContract.tokenURI(tokenId))
  if (isError(dataURI)) {
    console.error(
      `Error fetching dataURI for token ID ${tokenId}: ${dataURI.message}`
    )
    return
  }

  const data: TokenMetadata = JSON.parse(
    Buffer.from(dataURI.substring(29), "base64").toString("ascii")
  )
  const svg = Buffer.from(data.image.substring(26), "base64")
  return sharp(svg).png().toBuffer()
}

/**
 * Generate a counter name with the appropriate
 * prefix
 * @param counterName Counter name to prefix
 * @returns Prefixed counter name
 */
export const buildCounterName = (counterName: string) => `bots_${counterName}`
