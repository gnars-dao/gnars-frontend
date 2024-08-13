import useSWRImmutable from 'swr/immutable'

import { AddressType, CHAIN_IDS, CHAIN_ID } from '@constants/types'
import { getProvider } from '@utils/provider'

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.HARDHAT,
}: {
  address?: AddressType
  chainId?: CHAIN_ID
}) => {
  return useSWRImmutable(address ? [address, chainId] : undefined, async (address) => {
    const provider = getProvider(chainId)
    return await provider.getBytecode({ address }).then((x) => x !== '0x')
  })
}
