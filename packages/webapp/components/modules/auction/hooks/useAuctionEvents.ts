import { useDaoStore } from "@components/modules/dao";
import { USE_QUERY_KEYS } from "@constants/queryKeys";
import { AddressType, CHAIN_ID } from "@constants/types";
import { auctionAbi } from "data/contract/abis/Auction";
import { useRouter } from "next/router";
import { getBids } from "queries/base/requests/getBids";
import { useSWRConfig } from "swr";
import { useContractEvent } from "wagmi";
import { readContract } from "wagmi/actions";

export const useAuctionEvents = ({
  chainId,
  collection,
  tokenId,
  isTokenActiveAuction
}: {
  chainId: CHAIN_ID;
  collection: string;
  tokenId: string;
  isTokenActiveAuction: boolean;
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { auction } = useDaoStore((state) => state.addresses);

  useContractEvent({
    address: isTokenActiveAuction ? auction : undefined,
    abi: auctionAbi,
    eventName: "AuctionCreated",
    chainId,
    listener: async (logs) => {
      await mutate([USE_QUERY_KEYS.AUCTION, chainId, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as AddressType,
          chainId,
          functionName: "auction"
        })
      );

      const tokenId = logs[0].args.tokenId as bigint;

      await mutate([USE_QUERY_KEYS.AUCTION_BIDS, chainId, auction, tokenId], () =>
        getBids(chainId, collection, tokenId.toString())
      );

      await router.push(`/dao/${router.query.network}/${collection}/${tokenId}`);
    }
  });

  useContractEvent({
    address: isTokenActiveAuction ? auction : undefined,
    abi: auctionAbi,
    eventName: "AuctionBid",
    listener: async () => {
      await mutate([USE_QUERY_KEYS.AUCTION, chainId, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as AddressType,
          chainId: chainId,
          functionName: "auction"
        })
      );

      await mutate([USE_QUERY_KEYS.AUCTION_BIDS, chainId, auction, tokenId], () =>
        getBids(chainId, auction as string, tokenId)
      );
    }
  });
};
