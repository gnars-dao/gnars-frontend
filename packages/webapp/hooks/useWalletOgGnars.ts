import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query"
import { V2_START_ID } from "../utils/contracts"
import { getBuiltGraphSDK, WalletOgGnarsQuery } from "../.graphclient"
import { useAccount } from "wagmi"

export const useWalletOgGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK()
  return useQuery<WalletOgGnarsQuery["ogGnars"]>(
    ["ogGnarsClaimStatus", address],
    () => {
      if (!address) {
        return []
      }

      return sdk.WalletOgGnars({ owner: address }).then((r) => r.ogGnars)
    },
    {
      refetchInterval: 12000,
    }
  )
}
