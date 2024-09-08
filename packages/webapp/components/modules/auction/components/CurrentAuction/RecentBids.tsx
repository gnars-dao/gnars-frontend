import React from "react";
import { AllBids } from "../AllBids";
// import { allRecentBidsButton, recentBid } from '../Auction.css'
import { Bidder } from "./Bidder";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ETHERSCAN_BASE_URL } from "constants/";
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

// TODO: defaultBids is from 
const exampleBids =
  [
    {
      "id": "0x99f67a24562044fcbacc1a0434c87172994167ef676e6c87ab1707679a26308d:25",
      "amount": "10000000000000000",
      "bidder": "0x7093c7ee24c49ab814165b129bc7b5ff0993b3ba"
    }
  ];

export const RecentBids: React.FC<RecentBidsProps> = ({ bids = exampleBids }) => {
  const chain = useChainStore((x) => x.chain);

  return bids.length ? (
    <Box mt="x3" color="white !important">
      <Stack color="white">
        {bids.slice(0, 3).map(({ amount, bidder, id }) => (
          <Flex
            align="center"
            py="x2"
            marginTop={'20px'}
            justify="space-between"
            key={`${bidder}_${amount}`}
            // className={recentBid}
            className={"recent-bid"}
            color="white"

          >
            <Bidder address={bidder} />

            <Flex
              align="center"
              as="a"
              href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${bidder}`}
              target="_blank"
              rel="noopener noreferrer"
              color="white"
            >
              <Text marginRight={'20px'} variant="paragraph-md" color="white">
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
      <Text variant="paragraph-lg" color="white">
        No bids yet
      </Text>
    </Flex>
  );
};
