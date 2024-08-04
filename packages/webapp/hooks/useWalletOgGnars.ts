import { useQuery } from "@tanstack/react-query"
import { getBuiltGraphSDK, WalletOgGnarsQuery } from "subgraph/layer-1"

export const useWalletOgGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK()
  return useQuery<WalletOgGnarsQuery["ogGnars"], Error>({
    queryKey: ["ogGnarsClaimStatus", address],
    queryFn: () => {
      if (!address) {
        return []
      }

      return sdk.WalletOgGnars({ owner: address }).then((r) => r.ogGnars)
    },
    refetchInterval: 12000
  })
}
