import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { AccountAvatar } from 'components/AccountAvatar'
import { useEnsData } from 'hooks/useEnsData'

// import { recentBidder } from '../Auction.css'

interface BidderProps {
  address: string
}

export const Bidder: React.FC<BidderProps> = ({ address }) => {
  const { displayName, ensAvatar, ensNameLoading } = useEnsData(address)

  return (
    <Flex align="center">
      <Box mr="x2">
        <AccountAvatar address={address} avatarImg={ensAvatar ?? ''} isLoading={ensNameLoading} />
      </Box>
      <Text
        // className={recentBidder}
        className={'recent-bidder'}
        variant="paragraph-md">
        {displayName}
      </Text>
    </Flex>
  )
}
