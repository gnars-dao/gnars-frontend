import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Text, Code, Flex, Heading, Stack, VStack } from "@chakra-ui/react";
import { Auction } from "@components/modules/auction";

// import { DaoOgMetadata } from 'src/pages/api/og/dao'
import { AddressType, CHAIN_ID, CHAIN_IDS, Chain } from "constants/types";
// import { Meta } from 'src/components/Meta'
// import AnimatedModal from 'src/components/Modal/AnimatedModal'
// import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { CACHE_TIMES } from "constants/cacheTimes";
import { PUBLIC_ALL_CHAINS, PUBLIC_DEFAULT_CHAINS } from "constants/defaultChains";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
// import { SUCCESS_MESSAGES } from '@constants/messages'
import { BaseSDK } from "queries/resolvers";
import { TokenWithDaoQuery } from "subgraph-generated/base";
import { useAccount } from "wagmi";
import { USE_QUERY_KEYS } from "constants/queryKeys";
import { CurrentAuction } from "components/modules/auction/components/CurrentAuction";
import { auctionHistoryRequest } from "queries/base/requests/auctionHistory";
import { BidHistory } from "components/modules/auction/components/BidHistory";
import { getBids } from "queries/base/requests/getBids";
import { RecentBids } from "components/modules/auction/components/CurrentAuction/RecentBids";
import { averageWinningBid } from "queries/base/requests/averageWinningBid";
import { useEtherscanContractInfo } from "hooks/useEtherscanContractInfo";

export type TokenWithDao = NonNullable<TokenWithDaoQuery["token"]>;

interface TokenPageProps {
  url: string;
  collection: AddressType;
  token: TokenWithDao;
  name: string;
  // description: string
  tokenId: string;
  addresses: unknown; // DaoContractAddresses
  ogImageURL: string;
  chainId: CHAIN_ID;
}

const TokenPage = ({
  url,
  collection = "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17" as AddressType,
  token,
  // description,
  name,
  addresses,
  ogImageURL,
  chainId,
  ...props
}) => {
  const { query, replace, pathname } = useRouter();
  const { address } = useAccount();

  const chain = PUBLIC_ALL_CHAINS.find((x) => x.id === chainId) as Chain;

  useEffect(() => {
    console.log(`Auction Page: data: `, { query, replace, pathname, chainId, address, chain, url, collection, token, name, addresses });
  }, [query, replace, pathname, chainId, address, chain, url, collection, token, name, addresses, props]);

  const { data: auctionBids, error: auctionBidsError } = useQuery({
    queryKey: ['auctionBids', chainId, collection, token.tokenId],
    queryFn: async () => {
      const bids = await getBids(chainId, collection, token.tokenId);
      console.log(`Token Page getBids: `, bids);
      return bids;
    }
  });

  const { data: avgWinningBid, error: avgWinningBidError } = useQuery({
    queryKey: ['averageWinningBid', chainId, collection],
    queryFn: async () => {
      const avgWinningBid = await averageWinningBid(chainId, collection);
      console.log(`Token Page averageWinningBid: `, avgWinningBid);
      return avgWinningBid;
    }
  });

  const etherscanContractInfo = useEtherscanContractInfo(addresses.address);


  if (auctionBidsError) {
    console.log('Auction Token Page auctionBidsError: ', { auctionBids, auctionBidsError });
  }

  return (
    <Box padding={"20px"}>
      {/*<Meta
      title={name || ''}
      type={`${name}:nft`}
      image={ogImageURL}
      slug={url}
      description={ogDescription}
      farcaster={{
        name,
        contractAddress: collection,
        chain,
        image: token.image || undefined,
      }}
    />*/}
      <Stack border={'red'}></Stack>
      <Auction
        chain={chain}
        // auctionAddress={addresses.auction!}
        auctionAddress="0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17"
        collection={collection}
        token={token}
      />
      <Text color='white'>Recent Bids</Text>
      <RecentBids bids={auctionBids!} />
      <Stack border={'red'}>
        {/*<CurrentAuction chain={chain} tokenId={token.tokenId} auctionAddress={token.dao.auctionAddress} daoName={token.daoName} bids={auctionBids!} />*/}
        <pre style={{ color: 'white', width: '800px', height: '1000px' }}>{JSON.stringify(etherscanContractInfo, null, 2)}</pre>
      </Stack>
    </Box>
  );
};

export default TokenPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res, req, resolvedUrl }) => {
  const collection = params?.token as AddressType;
  const tokenId = params?.tokenId as string;
  const network = params?.network;

  console.log(`/dao/[network]/[token]/[tokenId].tsx`, collection, network, tokenId, `\n\n`);
  try {
    // const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)
    const chain = CHAIN_IDS.BASE;
    if (!chain) throw new Error("Invalid network");

    const env = process.env.VERCEL_ENV || "development";
    const protocol = env === "development" ? "http" : "https";

    const token = await BaseSDK.connect()
      .tokenWithDao({
        id: `${collection.toLowerCase()}:${tokenId}`
      })
      .then((x) => x.token);

    console.log(`dao/network/token.tsx token `, token);
    if (!token) throw new Error("Token not found");

    const {
      name,
      // description,
      contractImage,
      totalSupply,
      ownerCount,
      proposalCount,
      metadataAddress,
      treasuryAddress,
      governorAddress,
      auctionAddress
    } = token.dao;

    const addresses = {
      token: collection,
      metadata: metadataAddress,
      treasury: treasuryAddress,
      governor: governorAddress,
      auction: auctionAddress
    } as const;

    const daoOgMetadata = {
      // : DaoOgMetadata = {
      name,
      contractImage,
      totalSupply,
      ownerCount,
      proposalCount,
      chainId: chain,
      treasuryAddress
    };

    const ogImageURL = `${protocol}://${req.headers.host
      }/api/og/dao?data=${encodeURIComponent(JSON.stringify(daoOgMetadata))}`;

    const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO;
    res.setHeader("Cache-Control", `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`);

    const props: TokenPageProps = {
      url: resolvedUrl,
      collection,
      name,
      token,
      // description: description || '',
      tokenId,
      addresses,
      ogImageURL,
      chainId: Number(chain) as CHAIN_ID
    };
    console.log(`props returned: /dao/[network]/[token]/[tokenId].tsx `, props, `\n\n`);
    return {
      props
    };
  } catch (e) {
    console.error(`Error from /dao/[network]/[token]/[tokenId].tsx`, e, `\n\n`);
    return {
      notFound: true
    };
  }
};
