import { CHAIN_IDS } from "@constants";
import { ProposalState, getProposalState } from "@data/contract/requests/getProposalState.ts";
import { BaseSDK } from "@queries/resolvers.ts";
import * as Sentry from "@sentry/nextjs";
import { ProposalFragment, ProposalVoteFragment as ProposalVote } from "@subgraph-generated/base/index.ts";

export interface Proposal extends Omit<ProposalFragment, "executableFrom" | "expiresAt" | "calldatas"> {
  calldatas: string[];
  state: ProposalState;
  executableFrom?: number;
  expiresAt?: number;
  votes?: ProposalVote[];
}

export const formatAndFetchState = async (chainId: CHAIN_IDS, data: ProposalFragment) => {
  const { executableFrom, expiresAt, calldatas, ...proposal } = data;

  const baseProposal = {
    ...proposal,
    calldatas: calldatas ? calldatas.split(":") : [],
    state: await getProposalState(chainId, proposal.dao.governorAddress, proposal.proposalId)
  };

  // executableFrom and expiresAt will always either be both defined, or neither defined
  if (executableFrom && expiresAt) {
    return {
      ...baseProposal,
      executableFrom,
      expiresAt
    };
  }
  return baseProposal;
};

export const getProposal = async (chainId: CHAIN_IDS, proposalId: string): Promise<Proposal | undefined> => {
  try {
    const data = await BaseSDK.connect().proposal({
      proposalId
    });

    return formatAndFetchState(chainId, data.proposal!);
  } catch (e) {
    console.log("err", e);
    Sentry.captureException(e);
    await Sentry.flush(2000);
    return;
  }
};
