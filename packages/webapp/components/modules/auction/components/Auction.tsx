// @TODO Replace axios
// import axios from 'axios'
import React, { Fragment, ReactNode } from "react";
import { useAuctionEvents } from "../hooks";
// @TODO Fix styles for auctionGrid and auctionWrapper
// import { auctionGrid, auctionWrapper } from './Auction.css'
import { AuctionDetails } from "./AuctionDetails";
import { AuctionImage } from "./AuctionImage";
// import { AuctionPaused } from './AuctionPaused'
import { AuctionTokenPicker } from "./AuctionTokenPicker";
import { BidAmount } from "./BidAmount";
import { ActionsWrapper, BidHistory } from "./BidHistory";
import { CurrentAuction } from "./CurrentAuction";
// import { DaoMigrated } from './DaoMigrated'
import { WinningBidder } from "./WinningBidder";
import { Text } from "@chakra-ui/react";
import { Flex, Grid } from "@chakra-ui/react";
import { useDaoStore } from "@components/modules/dao";
import { USE_QUERY_KEYS } from "@constants/queryKeys";
import { AddressType, Chain } from "@constants/types";
// @TODO Pull in L2MigratedResponse
// import { L2MigratedResponse } from 'src/pages/api/migrated'
// @TODO Fix the page URLs (queries, params, etc.)
import { TokenWithDao } from "@pages/dao/[network]/[token]/[tokenId]";
// @TODO Pull in L1_CHAINS
// import { L1_CHAINS } from 'src/data/contract/chains'
import { getBids } from "@queries/base/requests/getBids";
import { unpackOptionalArray } from "@utils/helpers";
import { auctionAbi } from "data/contract/abis/Auction";
// @TODO Replace useSWR
import useSWR from "swr";
import { formatEther } from "viem";
import { readContract } from "wagmi/actions";

interface AuctionControllerProps {
  chain: Chain;
  auctionAddress: string;
  collection: string;
  token: TokenWithDao;
}

export const Auction: React.FC<AuctionControllerProps> = ({ chain, auctionAddress, collection, token }) => {
  console.log("Auction.tsx props passed through: ", { chain, auctionAddress, collection, token });
  const { mintedAt, name, image, owner: tokenOwner, tokenId: queriedTokenId } = token;
  const mintDate = mintedAt * 1000;
  const bidAmount = token.auction?.winningBid?.amount;
  const tokenPrice = bidAmount ? formatEther(bidAmount) : undefined;

  const {
    data: auction,
    error: auctionError,
    isLoading: auctionIsLoading
  } = useSWR(
    [USE_QUERY_KEYS.AUCTION, chain.id, auctionAddress],
    (_, chainId, auctionAddress) => {
      console.log(`Auction.tsx useSWR main auction query: `, USE_QUERY_KEYS.AUCTION, chainId, auctionAddress);
      if (auctionAddress) {
        return readContract({
          abi: auctionAbi,
          address: auctionAddress as AddressType,
          functionName: "auction",
          chainId
        });
      }
    },
    { revalidateOnFocus: true }
  );

  // @TODO Remove test logging
  React.useEffect(() => {
    console.log(`Auction.tsx from module data: `, { auction, chain, auctionAddress, collection, token });
  }, [auction, chain, auctionAddress, collection, token]);

  const [currentTokenId, highestBid, highestBidder, _, endTime, settled] = unpackOptionalArray(auction, 6);

  const isTokenActiveAuction = !settled && currentTokenId !== undefined && currentTokenId.toString() == queriedTokenId;

  /*useAuctionEvents({
    chainId: chain.id,
    collection,
    isTokenActiveAuction,
    tokenId: queriedTokenId
  });*/

  const { data: bids } = useSWR([USE_QUERY_KEYS.AUCTION_BIDS, chain.id, collection, queriedTokenId], () =>
    getBids(chain.id, collection, queriedTokenId)
  );

  return (
    <Grid display={"inline-flex"} className="auction-grid">
      <AuctionImage key={`auction-${collection}-image-${queriedTokenId}`} image={image || ""} isLoading={!auction} />
      <Flex
        display={"inline-flex"}
        height={"100%"}
        mt={"20px"}
        // className={auctionWrapper}
        className="auction-wrapper"
      >
        <AuctionTokenPicker mintDate={mintDate} name={name} collection={collection} tokenId={Number(queriedTokenId)} />

        {isTokenActiveAuction && !!auction && (
          <>
            <Text color="white">Current Auction Here</Text>
            <CurrentAuction
              chain={chain}
              tokenId={queriedTokenId}
              auctionAddress={auctionAddress as AddressType}
              daoName={token.dao.name}
              bid={highestBid}
              owner={highestBidder}
              endTime={endTime}
              bids={bids || []}
            />
          </>
        )}

        {!isTokenActiveAuction && !!auction && (
          <Fragment>
            <AuctionDetails>
              <BidAmount isOver bid={tokenPrice ?? undefined} />
              <WinningBidder owner={tokenOwner ?? undefined} />
            </AuctionDetails>
            <ActionsWrapper>
              <Text color="white">Bid History</Text>
              <BidHistory bids={bids || []} />
            </ActionsWrapper>
            {/** TODO: Determine if DaoMigrated is necessary */}
            {/*migratedRes?.migrated ? (
              <DaoMigrated
                l2ChainId={migratedRes.migrated.chainId}
                l2TokenAddress={migratedRes.migrated.l2TokenAddress}
              />
            ) : (
              <AuctionPaused />
            )
            */}
          </Fragment>
        )}
      </Flex>
    </Grid>
  );
};
