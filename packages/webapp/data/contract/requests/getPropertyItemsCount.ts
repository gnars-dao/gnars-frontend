import { AddressType } from "@constants";
import { CHAIN_IDS } from "@constants";
import { metadataAbi } from "@data/contract/abis";
import { readContract, readContracts } from "wagmi/actions";

export const getPropertyItemsCount = async (chainId: CHAIN_IDS, metadataAddress: AddressType) => {
  const baseParams = { address: metadataAddress, abi: metadataAbi, chainId: chainId };
  const propertiesCount = await readContract({
    ...baseParams,
    functionName: "propertiesCount"
  }).then((x) => Number(x));

  const contracts = Array(propertiesCount)
    .fill(0)
    .map((_, i) => {
      return {
        ...baseParams,
        functionName: "itemsCount",
        args: [i]
      };
    });

  const propertyItemsCount = (await readContracts({
    allowFailure: false,
    contracts
  })) as bigint[];

  return {
    propertiesCount,
    propertyItemsCount: propertyItemsCount.map((x) => Number(x))
  };
};
