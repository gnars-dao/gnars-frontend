import { useQuery } from "@tanstack/react-query"
import { getBuiltGraphSDK } from "../.graphclient"

export const walletHDGnarsQueryKey = "hdGnarsClaimStatus"

export const useWalletHDGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK()
  // https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#supports-a-single-signature-one-object
  return useQuery({
    queryKey: [walletHDGnarsQueryKey, address],
    queryFn: () => {
      if (!address) {
        return []
      }

      return sdk
        .WalletHDGnars({ owner: address.toLowerCase() })
        .then((r) => r.gnars || [])
        .then((gnars) => gnars.map((g) => ({ ...g, wasClaimed: address.toLowerCase() === g.hdOwner.toLowerCase() })))
    },
    refetchInterval: 12000,
})
}
