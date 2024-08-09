import { zip } from "lodash"
import { ProposalQuery, ProposalsQuery, ProposalStatus } from "@subgraph-generated/layer-1"
import { ProposalState } from "@data/contract/requests/getProposalState"

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
  value: bigint
  calldata: `0x${string}`
}

export const getTransactions = (proposal: DetailedProposalData): NounsTransactionData[] => {
  return zip(proposal.targets, proposal.signatures, proposal.values, proposal.calldatas).map(
    ([target, signature, value, calldata]) => ({
      target,
      signature,
      value,
      calldata,
    })
  )
}

export function parseState(state: ProposalState) {
  switch (state) {
    case ProposalState.Pending:
      return 'Pending'
    case ProposalState.Active:
      return 'Active'
    case ProposalState.Canceled:
      return 'Cancelled'
    case ProposalState.Defeated:
      return 'Defeated'
    case ProposalState.Succeeded:
      return 'Succeeded'
    case ProposalState.Queued:
      return 'Queued'
    case ProposalState.Expired:
      return 'Expired'
    case ProposalState.Executed:
      return 'Executed'
    case ProposalState.Vetoed:
      return 'Vetoed'
    default:
      return 'Loading'
  }
}

export const getProposalEffectiveStatus = (
  proposal: ProposalData,
  blockNumber: bigint | null | undefined,
  blockTimestamp: bigint | null | undefined
): EffectiveProposalStatus => {
  switch (true) {
    case proposal.status === "CANCELLED":
    case proposal.status === "EXECUTED":
    case proposal.status === "VETOED":
      return proposal.status
    case !blockNumber:
      return "UNDETERMINED"
    case proposal.status === "PENDING":
      return blockNumber! <= BigInt(proposal.startBlock) ? "PENDING" : "ACTIVE"
    case proposal.status === "ACTIVE":
      if (blockNumber! < BigInt(proposal.endBlock)) return "ACTIVE"
      const forVotes = BigInt(proposal.forVotes)
      return forVotes <= BigInt(proposal.againstVotes) || forVotes < BigInt(proposal.quorumVotes)
        ? "DEFEATED"
        : "SUCCEEDED"
    case !blockTimestamp || !proposal.executionETA:
      return "UNDETERMINED"
    case proposal.status === "QUEUED":
      const GRACE_PERIOD = 1209600n
      return blockTimestamp! >= BigInt(proposal.executionETA) + GRACE_PERIOD
        ? "EXPIRED"
        : blockTimestamp! >= BigInt(proposal.executionETA)
        ? "EXECUTABLE"
        : "QUEUED"
    default:
      return "UNDETERMINED"
  }
}

export const isFinalized = (effectiveStatus: EffectiveProposalStatus | string) =>
  ["DEFEATED", "EXECUTED", "EXPIRED", "CANCELLED", "VETOED"].includes(effectiveStatus?.toUpperCase())

export type QuorumVotes = ReturnType<typeof getQuorumVotes>

export interface Votes {
  forVotes: number
  againstVotes: number
  abstainVotes: number
  totalSupply: number
}

export interface Dates {}

export const getQuorumVotes = (prop: ProposalsQuery["proposals"][0]) => {
  const againstVotesBPS = (10_000 * parseInt(prop.againstVotes)) / parseInt(prop.totalSupply)
  const quorumAdjustmentBPS = (parseInt(prop.quorumCoefficient) * againstVotesBPS) / 1_000_000
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
