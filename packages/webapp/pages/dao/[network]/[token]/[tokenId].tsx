import { Flex, VStack, Box, Code, Heading } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { useAccount } from 'wagmi'

// import { Meta } from 'src/components/Meta'
// import AnimatedModal from 'src/components/Modal/AnimatedModal'
// import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { CACHE_TIMES } from 'constants/cacheTimes'
import { PUBLIC_ALL_CHAINS, PUBLIC_DEFAULT_CHAINS } from 'constants/defaultChains'
// import { CAST_ENABLED } from 'src/constants/farcasterEnabled'
// import { SUCCESS_MESSAGES } from '@constants/messages'
import { BaseSDK } from 'queries/resolvers'
import { TokenWithDaoQuery } from 'subgraph-generated/base'
// import { useVotes } from 'src/hooks'
// import { getDaoLayout } from 'src/layouts/DaoLayout'
/*import {
  About,
  Activity,
  AdminForm,
  DaoContractAddresses,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'*/
// import { DaoTopSection } from 'components/modules/dao/components/DaoTopSection'
// import FeedTab from 'src/modules/dao/components/Feed/Feed'
// import { NextPageWithLayout } from 'src/pages/_app'
// import { DaoOgMetadata } from 'src/pages/api/og/dao'
import { AddressType, CHAIN_ID, CHAIN_IDS, Chain } from '@constants/types'
// import { isPossibleMarkdown } from 'src/utils/helpers'

export type TokenWithDao = NonNullable<TokenWithDaoQuery['token']>

interface TokenPageProps {
  url: string
  collection: AddressType
  token: TokenWithDao
  name: string
  // description: string
  tokenId: string
  addresses: unknown // DaoContractAddresses
  ogImageURL: string
  chainId: CHAIN_ID
}

const TokenPage = ({
  url,
  collection = "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
  token,
  // description,
  name,
  addresses,
  ogImageURL,
  chainId,
  ...props
}) => {
  const { query, replace, pathname } = useRouter()
  const { address } = useAccount()
  console.log(`query for [tokenId]`, query, chainId, address, pathname);
  console.log(`tokenId page props`, props)
  const chain = PUBLIC_ALL_CHAINS.find((x) => x.id === chainId) as Chain
  console.log(`[tokenId] chain `, url, collection, token, name, addresses, chainId, `\n\n`);
  /*const { hasThreshold } = useVotes({
    chainId: chainId,
    signerAddress: address,
    collectionAddress: collection,
    governorAddress: addresses?.governor,
  })*/

  const handleCloseSuccessModal = () => {
    replace(
      {
        pathname,
        query: { token: collection, network: chain.slug, tokenId: token.tokenId },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  /*const sections = React.useMemo(() => {
    const aboutSection = {
      title: 'About',
      component: [<About key={'about'} />],
    }
    const proposalsSection = {
      title: 'Activity',
      component: [<Activity key={'proposals'} />],
    }
    const adminSection = {
      title: 'Admin',
      component: [<AdminForm key={'admin'} collectionAddress={collection} />],
    }
    const smartContractsSection = {
      title: 'Contracts',
      component: [<SmartContracts key={'smart_contracts'} />],
    }
    const daoFeed = {
      title: 'Feed',
      component: [<FeedTab key="feed" collectionAddress={collection} />],
    }

  // const publicSections = [aboutSection, proposalsSection, smartContractsSection]

  // const baseSections = hasThreshold ? [...publicSections, adminSection] : publicSections
  return CAST_ENABLED.includes(collection)
    ? [...baseSections.slice(0, 1), daoFeed, ...baseSections.slice(1)]
    : baseSections
}, [hasThreshold, collection])
*/
  /*const ogDescription = useMemo(() => {
    if (!description) return ''
    const isMarkdown = isPossibleMarkdown(description)
  
    // DAO descriptions are full of MD syntax and do not provide a pleasant
    // reading experience for social embeds. For this, we'll check if the
    // description is markdown and if so, we'll provide a generic description
    if (isMarkdown) {
      return `${name || 'This DAO'
        } was created on Nouns Builder. Please click the link to see more.`
    }
    // remove line breaks and formatting from og description
    const cleanDesc = description.replace(/(\r\n|\n|\r|\t|\v|\f|\\n)/gm, '')
    return cleanDesc.length > 111 ? `${cleanDesc.slice(0, 111)}...` : cleanDesc
  }, [description, name])*/

  // const activeTab = query?.tab ? (query.tab as string) : 'About'

  return (
    <Box padding={'20px'}>
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

      {/*<DaoTopSection
        chain={chain}
        collection={collection}
        auctionAddress={addresses.auction!}
        token={token}
      />*/}

      <Heading fontSize={'xx-large'} color='white' textAlign={'center'} py={'20px'}>Chain</Heading>
      <Code display="flex" whiteSpace="pre" width={'1000px'} overflow={'auto'} p="10px">
        {JSON.stringify(chain, null, 2)}
      </Code>

      <Heading fontSize={'xx-large'} color='white' textAlign={'center'} py={'20px'}>Collection</Heading>
      <Code display="flex" whiteSpace="pre" width={'1000px'} overflow={'auto'} p="10px">
        {collection.toString()}
      </Code>

      <Heading fontSize={'xx-large'} color='white' textAlign={'center'} py={'20px'}>Addresses</Heading>
      <Code display="flex" whiteSpace="pre" width={'1000px'} overflow={'auto'} p="10px">
        {JSON.stringify(addresses, null, 2)}
      </Code>

      <Heading fontSize={'xx-large'} color='white' bgColor='grey.50' textAlign={'center'} py={'20px'}>Token</Heading>
      <Code display="flex" whiteSpace="pre" width={'1000px'} overflow={'auto'} p="10px">
        {JSON.stringify(token, null, 2)}
      </Code>


      {/*<SectionHandler
      sections={sections}
      activeTab={activeTab}
      basePath={`/dao/${query.network}/${collection}/${token.tokenId}`}
    />

    <AnimatedModal
      open={query?.message === SUCCESS_MESSAGES.PROPOSAL_SUBMISSION_SUCCESS}
      close={handleCloseSuccessModal}
    >
      <SuccessModalContent
        title={`Proposal submitted`}
        subtitle={`Your Proposal has been successfully submitted. It might take a few minutes for it to appear.`}
        success
      />
    </AnimatedModal>*/}
    </Box>
  )
}

// TokenPage.getLayout = getDaoLayout

export default TokenPage

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  req,
  resolvedUrl,
}) => {
  const collection = params?.token as AddressType
  const tokenId = params?.tokenId as string
  const network = params?.network

  console.log(`/dao/[network]/[token]/[tokenId].tsx`, collection, network, tokenId, `\n\n`);
  try {
    // const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)
    const chain = CHAIN_IDS.BASE
    if (!chain) throw new Error('Invalid network')

    const env = process.env.VERCEL_ENV || 'development'
    const protocol = env === 'development' ? 'http' : 'https'

    const token = await BaseSDK.connect()
      .tokenWithDao({
        id: `${collection.toLowerCase()}:${tokenId}`,
      })
      .then((x) => x.token)

    console.log(`dao/network/token.tsx token `, token);
    if (!token) throw new Error('Token not found')

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
      auctionAddress,
    } = token.dao

    const addresses = {
      token: collection,
      metadata: metadataAddress,
      treasury: treasuryAddress,
      governor: governorAddress,
      auction: auctionAddress,
    } as const

    const daoOgMetadata = { // : DaoOgMetadata = {
      name,
      contractImage,
      totalSupply,
      ownerCount,
      proposalCount,
      chainId: chain,
      treasuryAddress,
    }

    const ogImageURL = `${protocol}://${req.headers.host
      }/api/og/dao?data=${encodeURIComponent(JSON.stringify(daoOgMetadata))}`

    const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    const props: TokenPageProps = {
      url: resolvedUrl,
      collection,
      name,
      token,
      // description: description || '',
      tokenId,
      addresses,
      ogImageURL,
      chainId: Number(chain) as CHAIN_ID,
    }
    console.log(`props returned: /dao/[network]/[token]/[tokenId].tsx `, props, `\n\n`);
    return {
      props,
    }
  } catch (e) {
    console.error(`Error from /dao/[network]/[token]/[tokenId].tsx`, e, `\n\n`);
    return {
      notFound: true,
    }
  }
}

/*
const AuctionPage = (props) => {

  useCallback(() => {
    console.log(`auction page props: `, props);
  }, [props]);

  return (
    <VStack>
      <code>{JSON.stringify(props, null, 2)}</code>
    </VStack>
  )
}

export default AuctionPage*/