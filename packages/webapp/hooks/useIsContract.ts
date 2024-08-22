import { AddressType, CHAIN_ID, CHAIN_IDS } from "@constants/types";
import { getProvider } from "@utils/provider";
import useSWRImmutable from "swr/immutable";

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.HARDHAT
}: {
  address?: AddressType;
  chainId?: CHAIN_ID;
}) => {
  return useSWRImmutable(address ? [address, chainId] : undefined, async (address) => {
    const provider = getProvider(chainId);
    return await provider.getBytecode({ address }).then((x) => x !== "0x");
  });
};
