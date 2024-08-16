import { Box, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { useContractRead } from 'wagmi'

import { Icon } from '@chakra-ui/icons'
import { PUBLIC_ALL_CHAINS } from 'constants/defaultChains'
import { auctionAbi } from 'data/contract/abis'
import { useDaoStore } from 'components/modules/dao'
import { useChainStore } from 'stores/useChainStore'
import { AddressType, CHAIN_ID } from '@constants/types'

export const DaoMigrated = ({
  l2ChainId,
  l2TokenAddress,
}: {
  l2ChainId: CHAIN_ID
  l2TokenAddress: AddressType
}) => {
  const { id: chainId } = useChainStore((x) => x.chain)
  const migratedToChain = PUBLIC_ALL_CHAINS.find((x) => x.id === l2ChainId)

  const { auction } = useDaoStore((x) => x.addresses)

  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'paused',
    chainId,
  })

  if (!paused) return null

  return (
    <Stack align={'center'} w="100%" mt="x7">
      <Box color="text3" fontSize={18}>
        This DAO has been migrated to L2.
      </Box>
      <Link href={`/dao/${migratedToChain?.slug}/${l2TokenAddress}`}>
        <Box
          display={'inline-flex'}
          color="text3"
          mt="x1"
          fontSize={18}
          // className={atoms({ textDecoration: 'underline' })}
          textDecoration={'underline'}
        >
          View DAO on L2
          <Icon fill="text4" id="external-16" />
        </Box>
      </Link>
    </Stack>
  )
}
