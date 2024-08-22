import React from "react";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { OptionalLink } from "@components/OptionalLink";
import USE_QUERY_KEYS from "@constants/queryKeys";
import { BaseSDK } from "@queries/resolvers";
import dayjs from "dayjs";
import { useRouter } from "next/router";
// import { useLayoutStore } from 'src/stores'
import { useChainStore } from "stores/useChainStore";
import useSWR from "swr";

// import { auctionDateNavButton, auctionTextVariants } from './Auction.css'

interface AuctionTokenPickerProps {
  collection: string;
  tokenId: number;
  mintDate?: number;
  name?: string;
}

export const AuctionTokenPicker: React.FC<AuctionTokenPickerProps> = ({
  collection,
  tokenId,
  mintDate,
  name
}: AuctionTokenPickerProps) => {
  const { id: chainId } = useChainStore((x) => x.chain);
  const { query, isReady } = useRouter();
  // const { isMobile } = useLayoutStore()
  const disabledStyle = { opacity: 0.2 };

  const { data } = useSWR(
    isReady ? [USE_QUERY_KEYS.DAO_NEXT_AND_PREVIOUS_TOKENS, chainId, collection, tokenId] : undefined,
    () =>
      BaseSDK.connect()
        .daoNextAndPreviousTokens({ tokenId, tokenAddress: collection.toLowerCase() })
        .then((x) => ({
          next: x.next.length > 0 ? parseInt(x.next[0].tokenId) : undefined,
          prev: x.prev.length > 0 ? parseInt(x.prev[0].tokenId) : undefined,
          latest: x.latest.length > 0 ? parseInt(x.latest[0].tokenId) : undefined
        }))
  );

  const hasPreviousToken = data?.prev !== undefined;
  const hasNextToken = data?.next !== undefined;

  return (
    <Flex direction={"column"}>
      <Flex align="center" direction={"row"} gap={"x2"}>
        <OptionalLink
          enabled={hasPreviousToken}
          href={`/dao/${query.network}/${collection}/${data?.prev}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasPreviousToken ? "a" : undefined}
            align={"center"}
            justify={"center"}
            // className={auctionDateNavButton}
            className={"auctionDateNavButton"}
          >
            <Icon id="arrowLeft" style={hasPreviousToken ? {} : disabledStyle} />
          </Flex>
        </OptionalLink>

        <OptionalLink
          enabled={hasNextToken}
          href={`/dao/${query.network}/${collection}/${data?.next}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasNextToken ? "a" : undefined}
            align={"center"}
            justify={"center"}
            // className={auctionDateNavButton}
            className="auction-date-nav-button"
          >
            <Icon id="arrowRight" style={hasNextToken ? {} : disabledStyle} />
          </Flex>
        </OptionalLink>

        <OptionalLink
          enabled={hasNextToken}
          href={`/dao/${query.network}/${collection}/${data?.latest}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasNextToken ? "a" : undefined}
            align={"center"}
            justify={"center"}
            // className={auctionDateNavButton}
            className="auction-date-nav-button"
          >
            <Text mx={"x3"} style={hasNextToken ? {} : disabledStyle} fontWeight={"display"}>
              {"Latest Auction"}
            </Text>
          </Flex>
        </OptionalLink>

        <Box className={"tertiary"} ml={"x2"}>
          {!!mintDate && dayjs(mintDate).format("MMMM DD, YYYY")}
        </Box>
      </Flex>
      {!!name && (
        <Flex align={"center"} justify={"flex-start"} className={"primary"} mt={"10px"} mb={"10px"}>
          {name}
        </Flex>
      )}
    </Flex>
  );
};
