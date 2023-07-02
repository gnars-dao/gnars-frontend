import { BigNumber, BigNumberish } from "ethers"
import { zip } from "lodash"
import { ProposalQuery, ProposalsQuery, ProposalStatus } from "../.graphclient"

export type ProposalData = ProposalsQuery["proposals"][0]

export type NewProposalData = {}

export type EffectiveProposalStatus =
  | ProposalStatus
  | "SUCCEEDED"
  | "DEFEATED"
  | "EXPIRED"
  | "UNDETERMINED"
  | "EXECUTABLE"
  | "PREVIEW"

export type DetailedProposalData = NonNullable<ProposalQuery["proposal"]>

export type NounsTransactionData = {
  target: `0x${string}`
  signature: string
  value: BigNumberish
  calldata: string
}

export const getTransactions = (
  proposal: DetailedProposalData
): NounsTransactionData[] => {
  return zip(
    proposal.targets,
    proposal.signatures,
    proposal.values,
    proposal.calldatas
  ).map(([target, signature, value, calldata]) => ({
    target,
    signature,
    value,
    calldata,
  }))
}

export const getProposalEffectiveStatus = (
  proposal: ProposalData,
  blockNumber: number | undefined,
  blockTimestamp: number | undefined
): EffectiveProposalStatus => {
  switch (true) {
    case proposal.status === "CANCELLED":
    case proposal.status === "EXECUTED":
    case proposal.status === "VETOED":
      return proposal.status
    case !blockNumber:
      return "UNDETERMINED"
    case proposal.status === "PENDING":
      return blockNumber! <= parseInt(proposal.startBlock)
        ? "PENDING"
        : "ACTIVE"
    case proposal.status === "ACTIVE":
      if (blockNumber! < parseInt(proposal.endBlock)) return "ACTIVE"
      const forVotes = BigNumber.from(proposal.forVotes)
      return forVotes.lte(proposal.againstVotes) ||
        forVotes.lt(proposal.quorumVotes)
        ? "DEFEATED"
        : "SUCCEEDED"
    case !blockTimestamp || !proposal.executionETA:
      return "UNDETERMINED"
    case proposal.status === "QUEUED":
      const GRACE_PERIOD = 14 * 60 * 60 * 24
      return blockTimestamp! >= parseInt(proposal.executionETA) + GRACE_PERIOD
        ? "EXPIRED"
        : "EXECUTABLE"
    default:
      return "UNDETERMINED"
  }
}

export const isFinalized = (effectiveStatus: EffectiveProposalStatus) =>
  ["DEFEATED", "EXECUTED", "EXPIRED", "CANCELLED", "VETOED"].includes(
    effectiveStatus
  )

export type QuorumVotes = ReturnType<typeof getQuorumVotes>

export interface Votes {
  forVotes: number
  againstVotes: number
  abstainVotes: number
  totalSupply: number
}

export interface Dates {}

export const getQuorumVotes = (prop: ProposalsQuery["proposals"][0]) => {
  const againstVotesBPS =
    (10_000 * parseInt(prop.againstVotes)) / parseInt(prop.totalSupply)
  const quorumAdjustmentBPS =
    (parseInt(prop.quorumCoefficient) * againstVotesBPS) / 1_000_000
  const adjustedQuorumBPS = prop.minQuorumVotesBPS + quorumAdjustmentBPS
  const quorumBPS = Math.min(prop.maxQuorumVotesBPS, adjustedQuorumBPS)
  return {
    min: Math.ceil((prop.minQuorumVotesBPS * prop.totalSupply) / 10_000),
    max: Math.ceil((prop.maxQuorumVotesBPS * prop.totalSupply) / 10_000),
    current: Math.ceil((quorumBPS * prop.totalSupply) / 10_000),
  }
}

export enum Support {
  Against = 0,
  For = 1,
  Abstain = 2,
}

// function bps2Uint(uint256 bps, uint256 number) internal pure returns (uint256) {
//         return (number * bps) / 10000;
//     }

// uint256 againstVotesBPS = (10000 * againstVotes) / totalSupply;
//         uint256 quorumAdjustmentBPS = (params.quorumCoefficient * againstVotesBPS) / 1e6;
//         uint256 adjustedQuorumBPS = params.minQuorumVotesBPS + quorumAdjustmentBPS;
//         uint256 quorumBPS = min(params.maxQuorumVotesBPS, adjustedQuorumBPS);
//         return bps2Uint(quorumBPS, totalSupply);
