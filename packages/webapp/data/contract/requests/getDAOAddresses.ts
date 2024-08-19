import { readContract } from "wagmi/actions";

import { NULL_ADDRESS, PUBLIC_MANAGER_ADDRESS } from "@constants";
import { AddressType } from "@constants";
import { CHAIN_IDS } from "@constants";
import { unpackOptionalArray } from "@utils/helpers";
import { managerAbi } from "../abis";

const getDAOAddresses = async (chainId: CHAIN_IDS, tokenAddress: AddressType) => {
  const addresses = await readContract({
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS[chainId],
    functionName: "getAddresses",
    args: [tokenAddress],
    chainId
  });

  const [metadata, auction, treasury, governor] = unpackOptionalArray(addresses, 4);

  const hasMissingAddresses = Object.values(addresses).includes(NULL_ADDRESS);
  if (hasMissingAddresses) return null;

  return {
    token: tokenAddress,
    auction,
    governor,
    metadata,
    treasury
  };
};

export default getDAOAddresses;
