import { metadataAbi } from "../../contract/abis";
import { CHAIN_IDS } from "@constants";
import { Address } from "viem";
import { readContracts } from "wagmi/actions";

export const getMetadataAttributes = async (metadata: Address, finalTokenId: bigint, chainId: CHAIN_IDS) => {
  let lengthRequests: any[] = [];
  for (let currentTokenId = 0n; currentTokenId <= finalTokenId; currentTokenId++) {
    lengthRequests.push({
      chainId,
      address: metadata,
      abi: metadataAbi,
      functionName: "attributes",
      args: [currentTokenId, 0n]
    });
  }

  const lengthResult = (await readContracts({
    contracts: lengthRequests,
    allowFailure: false
  })) as number[];

  let attributeRequests: any[] = [];
  for (let currentTokenId = 0; currentTokenId <= finalTokenId; currentTokenId++) {
    for (let attributeId = 0; attributeId <= lengthResult[currentTokenId]; attributeId++) {
      attributeRequests.push({
        chainId,
        address: metadata,
        abi: metadataAbi,
        functionName: "attributes",
        args: [BigInt(currentTokenId), BigInt(attributeId)]
      });
    }
  }

  const batchSize = 100;
  const attributeResult: number[] = [];

  for (let i = 0; i < attributeRequests.length; i += batchSize) {
    const batch = attributeRequests.slice(i, i + batchSize);
    const batchResult = (await readContracts({
      contracts: batch,
      allowFailure: false
    })) as number[];
    attributeResult.push(...batchResult);
  }

  const finalAttributes: number[][] = [];

  let currentTokenId = 0;
  let indexForTokenId = 0;

  for (let i = 0; i < attributeResult.length; i++) {
    if (!finalAttributes[currentTokenId]) finalAttributes[currentTokenId] = [];
    finalAttributes[currentTokenId].push(attributeResult[i]);

    if (indexForTokenId === lengthResult[currentTokenId]) {
      currentTokenId++;
      indexForTokenId = 0;
    } else {
      indexForTokenId++;
    }
  }

  return finalAttributes;
};
