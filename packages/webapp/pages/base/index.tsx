import React from "react";
import AuctionHistory from "./Auctions";
import { Box, VStack } from "@chakra-ui/react";

const BaseAuctionHistory = () => {
  // const collectionAddress = useAddress();

  return (
    <VStack>
      <AuctionHistory />
    </VStack>
  );
};

export default BaseAuctionHistory;
