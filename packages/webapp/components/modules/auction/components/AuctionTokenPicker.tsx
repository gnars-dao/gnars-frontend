import React from "react";
import { Icon } from "@chakra-ui/icons";
import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { OptionalLink } from "@components/OptionalLink";
import { USE_QUERY_KEYS } from "@constants/queryKeys";
import { BaseSDK } from "@queries/resolvers";
import { RoundButton } from "@components/RoundButton";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
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
  const { query, isReady, push } = useRouter();
  // const { isMobile } = useLayoutStore()
  const disabledStyle = { opacity: 0.2 };

  const { data } = useSWR(
    isReady ? [USE_QUERY_KEYS.DAO_NEXT_AND_PREVIOUS_TOKENS, chainId, collection, tokenId] : undefined,
    () =>
      BaseSDK.connect()
        .daoNextAndPreviousTokens({ tokenId, tokenAddress: collection.toLowerCase() })
        .then((x) => {
          console.log("AuctionTokenPicker x return val: ", x);
          return {
            next: x.next.length > 0 ? parseInt(x.next[0].tokenId) : undefined,
            prev: x.prev.length > 0 ? parseInt(x.prev[0].tokenId) : undefined,
            latest: x.latest.length > 0 ? parseInt(x.latest[0].tokenId) : undefined
          };
        })
  );

  React.useEffect(() => {
    if (data?.prev) {
      console.log(
        `AuctionTokenPicker data:`,
        data,
        "OptionalLink: ",
        `/dao/${query.network}/${collection}/${data?.prev}`,
        { data, collection, tokenId, mintDate, name }
      );
    }
  }, [data, collection, tokenId, mintDate, name, query.network]);

  const hasPreviousToken = data?.prev !== undefined;
  const hasNextToken = data?.next !== undefined;

  return (
    <VStack
      w="full"
      alignItems="center"
      justifyContent="center"
      spacing={6}
      maxW={{ base: "xl", lg: "500px", xl: "xl" }}
    >
      <HStack spacing={1}>
        <RoundButton
          px={0}
          isDisabled={!hasPreviousToken}
          onClick={() => push(`/dao/${query.network}/${collection}/${data?.prev}`)}
        >
          <HiArrowNarrowLeft />
        </RoundButton>
        <RoundButton
          px={0}
          isDisabled={!hasNextToken}
          onClick={() => push(`/dao/${query.network}/${collection}/${data?.next}`)}
        >
          <HiArrowNarrowRight />
        </RoundButton>
        <RoundButton
          isDisabled={!data?.latest}
          onClick={() => push(`/dao/${query.network}/${collection}/${data?.latest}`)}
        >
          Latest auction
        </RoundButton>
        <Text color="#888" ml={"10px"}>
          {!!mintDate && dayjs(mintDate).format("MMMM DD, YYYY")}
        </Text>
      </HStack>
      {!!name && (
        <Heading size="2xl" color="white">
          {name}
        </Heading>
      )}
    </VStack>
  );
};
