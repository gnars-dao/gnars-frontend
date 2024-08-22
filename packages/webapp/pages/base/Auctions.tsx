import React, { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { BaseSDK } from "@queries/resolvers";
// import { useAddress } from ""
import * as Sentry from "@sentry/nextjs";
import { Auction_OrderBy, OrderDirection } from "subgraph-generated/base";

export const auctionHistoryRequest = async (
  //chainId: CHAIN_ID,
  collectionAddress: string,
  startTime: number
) => {
  try {
    const data = await BaseSDK.connect().auctionHistory({
      startTime,
      daoId: collectionAddress,
      orderDirection: OrderDirection.Asc,
      orderBy: Auction_OrderBy.EndTime,
      first: 1000
    });
    console.log(`Auction history Data`, data);
    return data;
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await Sentry.flush(2000);
  }
};

const AuctionHistory = () => {
  // const collectionAddress = useAddress();

  useEffect(() => {}, []);
  return <VStack></VStack>;
};

export default AuctionHistory;
