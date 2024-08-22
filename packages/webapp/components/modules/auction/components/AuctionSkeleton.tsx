import { Box, Flex, Grid } from '@chakra-ui/react'
/*
import {
  auctionGrid,
  auctionSkeleton,
  auctionWrapVariants,
  auctionWrapper,
  tokenImage,
} from './Auction.css'
*/
export const AuctionSkeleton = () => {
  return (
    <Flex
      // className={auctionWrapVariants['post']}
      className={'auction-wrap-variants-post'}
    >
      <Grid
        // className={auctionGrid}
        className='auction-grid'
      >
        <Box
          backgroundColor="background2"
          width={'100%'}
          height={'auto'}
          aspectRatio={1 / 1}
          position="relative"
          // className={[tokenImage, auctionSkeleton]}
          className={'token-image auction-skeleton'}
        ></Box>
        <Flex
          direction={'column'}
          height={"auto"}
          mt={'5px'}
          // className={auctionWrapper}

          className={'auction-wrapper'}>
          <Box
            backgroundColor="background2"
            h="x8"
            // className={auctionSkeleton}
            className={'auction-skeleton'}
            style={{ width: '350px' }}
            borderRadius="normal"
          />
          <Box
            backgroundColor="background2"
            // className={auctionSkeleton}
            className={'auction-skeleton'}
            h="x16"
            w="x64"
            mt="x4"
            borderRadius="normal"
          />
          <Flex w="100%">
            <Box
              backgroundColor="background2"
              // className={auctionSkeleton}
              className={'auction-skeleton'}
              h="x16"
              w="x32"
              style={{ width: '150px' }}
              mt="x4"
              borderRadius="normal"
            />
            <Box
              backgroundColor="background2"
              // className={auctionSkeleton}
              className={'auction-skeleton'}
              h="x16"
              ml="x6"
              style={{ width: '150px' }}
              mt="x4"
              borderRadius="normal"
            />
          </Flex>
          <Flex w="100%">
            <Box
              backgroundColor="background2"
              // className={auctionSkeleton}
              className={'auction-skeleton'}
              h="x10"
              w="x64"
              mt="x4"
              borderRadius="normal"
            />
            <Box
              backgroundColor="background2"
              // className={auctionSkeleton}
              className={'auction-skeleton'}
              h="x10"
              ml="x6"
              w="x32"
              mt="x4"
              borderRadius="normal"
            />
          </Flex>
          <Box
            backgroundColor="background2"
            // className={auctionSkeleton}
            className={'auction-skeleton'}
            h="x6"
            style={{ width: '400px' }}
            mt="x4"
            borderRadius="normal"
          />
        </Flex>
      </Grid>
    </Flex>
  )
}
