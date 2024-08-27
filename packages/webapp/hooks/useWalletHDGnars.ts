import { getBuiltGraphSDK } from "../subgraph-generated/layer-1";
import { useQuery } from "@tanstack/react-query";

export const walletHDGnarsQueryKey = "hdGnarsClaimStatus";

export const useWalletHDGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK();

  return useQuery({
    queryKey: [walletHDGnarsQueryKey, address],
    queryFn: () => {
      if (!address) {
        return [];
      }

      return sdk
        .WalletHDGnars({ owner: address.toLowerCase() })
        .then((r) => r.gnars || [])
        .then((gnars) => gnars.map((g) => ({ ...g, wasClaimed: address.toLowerCase() === g.hdOwner.toLowerCase() })));
    },
    refetchInterval: 12000
  });
};
