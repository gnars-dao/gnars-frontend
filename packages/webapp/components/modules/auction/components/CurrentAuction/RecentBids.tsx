import React from "react";
import { AllBids } from "../AllBids";
// import { allRecentBidsButton, recentBid } from '../Auction.css'
import { Bidder } from "./Bidder";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ETHERSCAN_BASE_URL } from "@constants/etherscan";
import { AuctionBidFragment } from "@subgraph-generated/base";
import dynamic from "next/dynamic";
import { useChainStore } from "stores/useChainStore";

// TODO: Check if AnimatedModal needs to be pulled in from nouns-builder
// const AnimatedModal = dynamic(() => import('src/components/Modal/AnimatedModal'), {
//   ssr: false,
// })

interface RecentBidsProps {
  bids: AuctionBidFragment[];
}

export const RecentBids: React.FC<RecentBidsProps> = ({ bids }) => {
  const chain = useChainStore((x) => x.chain);

  return bids.length ? (
    <Box mt="x3">
      <Stack>
        {bids.slice(0, 3).map(({ amount, bidder, id }) => (
          <Flex
            align="center"
            py="x2"
            justify="space-between"
            key={`${bidder}_${amount}`}
            // className={recentBid}
            className={"recent-bid"}
          >
            <Bidder address={bidder} />

            <Flex
              align="center"
              as="a"
              href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${bidder}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text mr="x2" variant="paragraph-md" color="tertiary">
                {amount} ETH
              </Text>
              <Icon id="external-16" fill="text4" />
            </Flex>
          </Flex>
        ))}
        <Flex
          mt="x4"
          align="center"
          justify="center"
          //className={recentBid}
          className={"recent-bid"}
        >
          {/*
          <AnimatedModal
            trigger={
              <button type="button" className={allRecentBidsButton}>
                View All Bids
              </button>
            }
          >
            <AllBids bids={bids} />
          </AnimatedModal>
          */}
        </Flex>
      </Stack>
    </Box>
  ) : (
    <Flex mt="x5" align="center" justify="center">
      <Text variant="paragraph-lg" color="tertiary">
        No bids yet
      </Text>
    </Flex>
  );
};
