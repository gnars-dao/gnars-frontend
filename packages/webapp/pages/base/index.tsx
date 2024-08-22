import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import AuctionHistory from './Auctions';


const BaseAuctionHistory = () => {
  // const collectionAddress = useAddress();


  return (
    <VStack>
      <AuctionHistory />
    </VStack>
  )
}

export default BaseAuctionHistory