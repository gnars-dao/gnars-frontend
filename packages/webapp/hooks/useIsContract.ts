import { AddressType, CHAIN_ID, CHAIN_IDS } from "constants/types";
import { getProvider } from "utils/provider";
import useSWRImmutable from "swr/immutable";

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.BASE
}: {
  address?: AddressType;
  chainId?: CHAIN_ID;
}) => {
  return useSWRImmutable(address ? [address, chainId] : undefined, async (address) => {
    const provider = getProvider(chainId);
    // TODO: figure out this type, probably the provider
    return await provider.getBytecode({ address }).then((x) => x !== "0x");
  });
};
