import { CHAIN_ID } from "@constants/types";
import { walletSnippet } from "@utils/helpers";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";

export const useEnsData = (address?: string) => {
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: address as `0x${string}`,
    chainId: CHAIN_ID.ETHEREUM
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: CHAIN_ID.ETHEREUM
  });

  const { data: ensAddress } = useEnsAddress({
    name: address,
    chainId: CHAIN_ID.ETHEREUM
  });

  return {
    ensName,
    ensNameLoading,
    ensAvatar,
    ethAddress: ensAddress,
    displayName: ensName || walletSnippet(address)
  };
};
