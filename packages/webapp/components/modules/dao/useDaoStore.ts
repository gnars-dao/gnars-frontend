import { GetContractResult } from 'wagmi/actions'
import { create } from 'zustand'

import { auctionAbi } from 'data/contract/Auction'
import { governorAbi } from 'data/contract/Governor'
import { metadataAbi } from 'data/contract/Metadata'
import { tokenAbi } from 'data/contract/Token'
import { treasuryAbi } from 'data/contract/Treasury'

import { AddressType } from '@constants/types'

export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
}

export interface DaoContracts {
  tokenContract?: GetContractResult<typeof tokenAbi>
  metadataContract?: GetContractResult<typeof metadataAbi>
  auctionContract?: GetContractResult<typeof auctionAbi>
  treasuryContract?: GetContractResult<typeof treasuryAbi>
  governorContract?: GetContractResult<typeof governorAbi>
}

export interface DaoStoreProps {
  addresses: DaoContractAddresses
  setAddresses: (addresses: DaoContractAddresses) => void
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses }),
}))
