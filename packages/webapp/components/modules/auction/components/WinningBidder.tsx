import { Box, Flex } from '@chakra-ui/react'

import { AccountAvatar } from 'components/AccountAvatar'
import { Icon } from '@chakra-ui/icons'
import { NULL_ADDRESS } from '@constants/baseAddresses'
import { ETHERSCAN_BASE_URL } from '@constants/etherscan'
import { useEnsData } from 'hooks/useEnsData'
import { useChainStore } from 'stores/useChainStore'

import { AuctionDetail } from './AuctionDetail'

export const WinningBidder = ({ owner }: { owner?: string }) => {
  const { displayName, ensAvatar, ensNameLoading } = useEnsData(owner)
  const chain = useChainStore((x) => x.chain)

  return (
    <AuctionDetail title="Held by">
      {!owner || owner === NULL_ADDRESS ? (
        'n/a'
      ) : (
        <Flex direction={'row'} align={'center'}>
          <AccountAvatar address={owner} avatarImg={ensAvatar} isLoading={ensNameLoading} />
          <Box
            as="a"
            href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${owner}`}
            rel={'noopener noreferrer'}
            target="_blank"
            ml={'x2'}
          >
            {displayName}
          </Box>
          <Icon ml="x1" fill="text4" id="arrowTopRight" />
        </Flex>
      )}
    </AuctionDetail>
  )
}
