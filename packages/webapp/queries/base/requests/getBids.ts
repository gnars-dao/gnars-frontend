import { CHAIN_ID } from "@constants/types";
import { BaseSDK } from "@queries/resolvers";
import * as Sentry from "@sentry/nextjs";
import { AuctionBidFragment } from "@subgraph-generated/base";
import { formatEther } from "viem";

export const getBids = async (chainId: CHAIN_ID, collection: string, tokenId: string) => {
  try {
    return BaseSDK.connect()
      .auctionBids({ id: `${collection.toLowerCase()}:${tokenId}` })
      .then((x) =>
        x.auction?.bids?.map((bid: AuctionBidFragment) => ({
          ...bid,
          amount: formatEther(bid.amount)
        }))
      );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await Sentry.flush(2000);
    return undefined;
  }
};
