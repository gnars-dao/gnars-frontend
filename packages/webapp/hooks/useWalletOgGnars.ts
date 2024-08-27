import { WalletOgGnarsQuery, getBuiltGraphSDK } from "../subgraph-generated/layer-1";
import { useQuery } from "@tanstack/react-query";

export const useWalletOgGnars = (address?: string) => {
  const sdk = getBuiltGraphSDK();

  return useQuery<WalletOgGnarsQuery["ogGnars"], Error>({
    queryKey: ["ogGnarsClaimStatus", address],
    queryFn: () => {
      if (!address) {
        return [];
      }

      return sdk.WalletOgGnars({ owner: address }).then((r) => r.ogGnars);
    },
    refetchInterval: 12000
  });
};
