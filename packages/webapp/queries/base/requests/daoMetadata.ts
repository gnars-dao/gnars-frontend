import { encodeFunctionData } from 'viem'

import { metadataAbi } from 'data/contract/abis'
import { L1_CHAINS } from 'data/contract/chains'
import { AddressType, CHAIN_ID } from 'constants/types'

import { BaseSDK } from 'queries/resolvers'

export const encodedDaoMetadataRequest = async (
  tokenAddress: AddressType,
  chain?: CHAIN_ID,
) => {
  if (!L1_CHAINS.find((x) => x === chain)) throw new Error('Only L1 Chains are supported')

  const res = await BaseSDK.connect()
    .daoMetadata({ tokenAddress: tokenAddress.toLowerCase(), first: 1000 })
    .then((x) => x.dao?.metadataProperties)

  if (!res) throw new Error('No metadata found')

  return res.map((property) =>
    encodeFunctionData({
      abi: metadataAbi,
      functionName: 'addProperties',
      args: [
        property.names,
        property.items,
        { baseUri: property.ipfsBaseUri, extension: property.ipfsExtension },
      ],
    })
  )
}
