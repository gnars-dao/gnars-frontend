import { governorAbi } from "@data/contract/abis";
import { CHAIN_IDS } from "@constants/networkConfig";
import { AddressType, BytesType } from "@constants/types";
import { readContract } from "wagmi/actions";

export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
  Vetoed = 8
}

export const getProposalState = async (chainId: CHAIN_IDS, governorAddress: AddressType, proposalId: BytesType) => {
  const baseParams = { address: governorAddress, abi: governorAbi, chainId };
  return (await readContract({
    ...baseParams,
    functionName: "state",
    args: [proposalId]
  })) as ProposalState;
};
