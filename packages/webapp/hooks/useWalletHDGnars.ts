import { useQuery } from "@tanstack/react-query"
import { getBuiltGraphSDK } from "../subgraph/layer-1"

export const walletHDGnarsQueryKey = "hdGnarsClaimStatus"

export const useWalletHDGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK()
  return useQuery(
    [walletHDGnarsQueryKey, address],
    () => {
      if (!address) {
        return []
      }

      return sdk
        .WalletHDGnars({ owner: address.toLowerCase() })
        .then((r) => r.gnars || [])
        .then((gnars) => gnars.map((g) => ({ ...g, wasClaimed: address.toLowerCase() === g.hdOwner.toLowerCase() })))
    },
    {
      refetchInterval: 12000,
    }
  )
}
