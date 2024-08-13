import { Box, Stack, StackProps, Text, VStack } from "@chakra-ui/react"
import React from 'react'

import { AuctionBidFragment } from 'subgraph-generated/base'

import { BidCard } from './BidCard'

interface AuctionAllBidsProps {
  bids: AuctionBidFragment[]
}

export const AllBids: React.FC<AuctionAllBidsProps> = ({ bids }) => {
  return (
    <Stack direction={'column'}>
      {bids.length > 0 ? (
        <>
          <Box fontSize={20} mb={'x2'}>
            Bid History
          </Box>

          <Stack pb="x4" direction="column" overflowY="auto" style={{ height: 200 }}>
            {bids.map((bid: AuctionBidFragment) => (
              <BidCard key={`${bid.bidder}_${bid.amount}_expanded`} bid={bid} />
            ))}
          </Stack>
        </>
      ) : (
        <Box fontSize={20}>No bids</Box>
      )}
    </Stack>
  )
}
