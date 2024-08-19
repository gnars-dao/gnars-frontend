import { Proposal } from "./proposalQuery";
import { getProposalState } from "@data/contract/requests/getProposalState";
import { BaseSDK } from "@queries/resolvers.ts";
import * as Sentry from "@sentry/nextjs";

export interface ProposalsResponse {
  proposals: Proposal[];
  pageInfo?: {
    hasNextPage: boolean;
  };
}

export const getProposals = async (chainId: number, token: string, limit: number): Promise<ProposalsResponse> => {
  try {
    const data = await BaseSDK.connect().proposals({
      where: {
        dao: token.toLowerCase()
      },
      first: limit
    });

    return {
      proposals: await Promise.all(
        data?.proposals.map(async (p) => {
          const { executableFrom, expiresAt, calldatas, ...proposal } = p;

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
        })
      ),
      pageInfo: {
        hasNextPage: data.proposals.reverse()[0].proposalNumber !== 1
      }
    };
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
    return {
      proposals: []
    };
  }
};
