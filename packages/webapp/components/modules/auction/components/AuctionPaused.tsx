/*import { Box, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { encodeFunctionData } from 'viem'
import { useContractRead } from 'wagmi'

// import { Icon } from 'src/components/Icon'

import { auctionAbi } from 'data/contract/abis/Auction'
import { ProposalState } from 'data/contract/requests/getProposalState'
import {
  ProposalsResponse,
  getProposals,
} from '@queries/base/requests/proposalsQuery'
import { useDaoStore } from '@components/modules/dao/useDaoStore'
import { useChainStore } from 'stores/useChainStore'
import USE_QUERY_KEYS from '@constants/swrKeys'

export const AuctionPaused = () => {
  const { query, isReady } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const LIMIT = 20

  const { auction } = useDaoStore((x) => x.addresses)

  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'paused',
    chainId: chain.id,
  })
  // TODO Fix queryKey, return type and Number errors
  const { data } = // useQuery<ProposalsResponse>({
    useQuery({
      queryKey: (paused && isReady ? [USE_QUERY_KEYS.PROPOSALS, chain.id, query.token, query.page] : undefined),
      queryFn: (_, chainId, token, page) => getProposals(chainId, token, LIMIT) // Number(page))
    })

  const pausedProposal = useMemo(() => {
    if (!(paused && auction)) return undefined

    const pauseCalldata = encodeFunctionData({
      abi: auctionAbi,
      functionName: 'pause',
    })

    const unpauseCalldata = encodeFunctionData({
      abi: auctionAbi,
      functionName: 'unpause',
    })

    return data?.proposals.find((proposal) => {
      if (proposal.state !== ProposalState.Executed) return false

      const pauseIndex = proposal.calldatas.findIndex(
        (calldata) => calldata === pauseCalldata
      )
      const unpauseIndex = proposal.calldatas.findIndex(
        (calldata) => calldata === unpauseCalldata
      )

      const isPausing = pauseIndex >= 0 ? proposal.targets[pauseIndex] !== auction : false
      const isUnpausing =
        unpauseIndex >= 0 ? proposal.targets[unpauseIndex] === auction : false

      if (isPausing && !isUnpausing) return proposal
    })
  }, [paused, data?.proposals])

  if (!paused) return null

  return (
    <Stack align={'center'} w="100%" mt="x7">
      <Box color="text3" fontSize={18}>
        Auctions have been paused.
      </Box>
      <Link
        shallow={!pausedProposal?.proposalId}
        href={
          pausedProposal?.proposalId
            ? `/dao/${query.network}/${query.token}/vote/${pausedProposal?.proposalNumber}`
            : `/dao/${query.network}/${query.token}?tab=activity`
        }
      >
        <Box
          display={'inline-flex'}
          color="text3"
          mt="x1"
          fontSize={18}
          className={{textDecoration: 'underline' })}
        >
           <Icon align="center" fill="text4" id="external-16" size="sm" /> 
{pausedProposal?.proposalId ? 'See proposal here' : 'See activity tab'}
{pausedProposal?.proposalId ? (

  <Text>Paused proposal WIP</Text>
) : (
  <></>
)}
</Box>
</Link>
</Stack>
)
}*/
