import React from "react";
import { BidCard } from "./BidCard";
import {
  Box,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  StackProps,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode
} from "@chakra-ui/react";
import { AvatarWallet } from "@components/AvatarWallet";
import { ETHERSCAN_BASE_URL } from "@constants/etherscan";
import { formatCryptoVal } from "@utils/numbers";
import { HiExternalLink } from "react-icons/hi";
import { useChainStore } from "stores/useChainStore";
import { AuctionBidFragment } from "subgraph-generated/base";

interface AuctionAllBidsProps {
  bids: AuctionBidFragment[];
}

export const AllBids: React.FC<AuctionAllBidsProps> = ({ bids, ...props }) => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300";
  const columns = useBreakpointValue([1, 2]);
  const chain = useChainStore((x) => x.chain);

  return (
    <VStack
      overflowY={"auto"}
      borderRadius={"md"}
      borderColor={borderColor}
      borderWidth={1}
      color={borderColor}
      w={"full"}
      divider={<StackDivider />}
      spacing={0}
      fontSize={"sm"}
      {...props}
    >
      {bids.length > 0 ? (
        bids.map((bid, i) => (
          <SimpleGrid py={2} px={4} key={`bid-${i}`} columns={columns} w={"full"}>
            <AvatarWallet address={bid.bidder} justifySelf={"start"} />

            <Link
              isExternal
              justifySelf={"end"}
              alignSelf={"center"}
              href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${bid.bidder}`}
            >
              <Text>
                {formatCryptoVal(bid.amount)} ETH{" "}
                <HiExternalLink
                  style={{
                    display: "inline",
                    verticalAlign: "text-bottom"
                  }}
                />
              </Text>
            </Link>
          </SimpleGrid>
        ))
      ) : (
        <Box fontSize={20}>No bids</Box>
      )}
    </VStack>
  );
};
