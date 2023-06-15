import {
  EIP1967_PROXY_BEACON_ADDRESS_SLOT,
  EIP1967_PROXY_IMPLEMENTATION_ADDRESS_SLOT,
} from "constants/ercs"
import { isAddress } from "ethers/lib/utils.js"
import { useProvider, useQuery } from "wagmi"

const nonZeroAddress = (address: string) =>
  address ===
  "0x0000000000000000000000000000000000000000000000000000000000000000"
    ? null
    : address

export const useProxyImplementationAddress = (address?: string) => {
  const provider = useProvider()
  return useQuery(
    ["proxyImplementationAddress", address, provider],
    async () => {
      if (!address || !isAddress(address)) return null
      const [implementationAddress, beaconAddress] = await Promise.all([
        provider
          .getStorageAt(address, EIP1967_PROXY_IMPLEMENTATION_ADDRESS_SLOT)
          .then(nonZeroAddress),
        provider
          .getStorageAt(address, EIP1967_PROXY_BEACON_ADDRESS_SLOT)
          .then(nonZeroAddress),
        ,
      ])
      return implementationAddress ?? beaconAddress
    }
  )
}
