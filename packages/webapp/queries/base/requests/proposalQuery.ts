import * as Sentry from '@sentry/nextjs'

import {
  ProposalState,
  getProposalState,
} from '@data/contract/requests/getProposalState.ts'
import { BaseSDK } from '@queries/resolvers.ts'
import {
  ProposalFragment,
  ProposalVoteFragment as ProposalVote,
} from '@subgraph-generated/base/index.ts'
import { CHAIN_IDS } from '@constants/types';

export interface Proposal
  extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt' | 'calldatas'> {
  calldatas: string[]
  state: ProposalState
  executableFrom?: number
  expiresAt?: number
  votes?: ProposalVote[]
}

export const formatAndFetchState = async (chainId: CHAIN_IDS, data: ProposalFragment) => {
  const { executableFrom, expiresAt, calldatas, ...proposal } = data

  const baseProposal = {
    ...proposal,
    calldatas: calldatas ? calldatas.split(':') : [],
    state: await getProposalState(
      chainId,
      proposal.dao.governorAddress,
      proposal.proposalId
    ),
  }

  // executableFrom and expiresAt will always either be both defined, or neither defined
  if (executableFrom && expiresAt) {
    return {
      ...baseProposal,
      executableFrom,
      expiresAt,
    }
  }
  return baseProposal
}

export const getProposal = async (
  chainId: CHAIN_IDS,
  proposalId: string
): Promise<Proposal | undefined> => {
  try {
    const data = await SDK.connect(chainId).proposal({
      proposalId,
    })

    return await formatAndFetchState(chainId, data.proposal!)
  } catch (e) {
    console.log('err', e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return
  }
}
