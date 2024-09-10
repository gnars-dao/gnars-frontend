import React from "react";
import { Icon } from "@chakra-ui/icons";
import { Box, Stack, StackProps, Text, VStack } from "@chakra-ui/react";
import { AccountAvatar } from "components/AccountAvatar";
import { ETHERSCAN_BASE_URL } from "@constants/etherscan";
import { useEnsData } from "hooks/useEnsData";
import { useChainStore } from "stores/useChainStore";
import { AuctionBidFragment } from "subgraph-generated/base";
import { formatCryptoVal } from "@utils/numbers";

export const BidCard = ({ bid }: { bid: AuctionBidFragment }) => {
  const { displayName, ensAvatar } = useEnsData(bid?.bidder);
  const chain = useChainStore((x) => x.chain);

  return (
    <Stack direction={"column"} my="x4" align="center" style={{ height: 35 }}>
      <Stack direction="row" width={"100%"} align="center" justify="space-between">
        <Stack direction="row" align="center">
          <AccountAvatar address={bid.bidder} avatarImg={ensAvatar ?? ""} />
          <Text mx="x2" variant="paragraph-md">
            {displayName}
          </Text>
        </Stack>
        <Stack direction="row" align="center">
          <Stack
            as="a"
            href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${bid.bidder}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text mr="x2" variant="paragraph-md">
              {formatCryptoVal(bid.amount)} ETH
            </Text>
            <Icon id="external-16" fill="text4" />
          </Stack>
        </Stack>
      </Stack>
      <Box
        mt="x2"
        style={{
          borderBottom: "1px solid #B3B3B3",
          width: "100%",
          opacity: 0.5
        }}
      />
    </Stack>
  );
};
