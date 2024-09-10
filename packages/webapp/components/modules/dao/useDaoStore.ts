import { AddressType } from "@constants/types";
import { auctionAbi } from "data/contract/abis";
import { governorAbi } from "data/contract/abis";
import { metadataAbi } from "data/contract/abis";
import { tokenAbi } from "data/contract/abis";
import { treasuryAbi } from "data/contract/abis";
import { GetContractResult } from "wagmi/actions";
import { create } from "zustand";

export interface DaoContractAddresses {
  token?: AddressType;
  metadata?: AddressType;
  auction?: AddressType;
  treasury?: AddressType;
  governor?: AddressType;
}

export interface DaoContracts {
  tokenContract?: GetContractResult<typeof tokenAbi>;
  metadataContract?: GetContractResult<typeof metadataAbi>;
  auctionContract?: GetContractResult<typeof auctionAbi>;
  treasuryContract?: GetContractResult<typeof treasuryAbi>;
  governorContract?: GetContractResult<typeof governorAbi>;
}

export interface DaoStoreProps {
  addresses: DaoContractAddresses;
  setAddresses: (addresses: DaoContractAddresses) => void;
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses })
}));
