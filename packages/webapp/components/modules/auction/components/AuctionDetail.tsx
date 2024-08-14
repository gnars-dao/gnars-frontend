import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

// import { auctionTextVariants } from './Auction.css'

export const AuctionDetail = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <Flex direction={'column'} style={{ flexBasis: '50%', flexGrow: 0 }}>
    <Box className={'tertiary'}>{title}</Box>
    <Box
      className={'secondary'}
      mt={{ '@initial': 'x1', '@768': 'x2' }}
    >
      {children}
    </Box>
  </Flex>
)
