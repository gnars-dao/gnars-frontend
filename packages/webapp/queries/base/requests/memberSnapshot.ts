import { BaseSDK } from "queries/resolvers"
import { applyL1ToL2Alias } from "modules/create-proposal/utils/applyL1ToL2Alias"
import { CHAIN_IDS } from "typings"

import { DaoTokenOwner_OrderBy, OrderDirection } from "../../subgraph/base/index.ts"

export type DaoMember = {
  address: string
  tokens: number[]
}

export const memberSnapshotRequest = async (chainId: CHAIN_IDS, collectionAddress: string): Promise<DaoMember[]> => {
  const data = await SDK.connect(chainId).daoMembersList({
    where: {
      dao: collectionAddress.toLowerCase()
    },
    first: 1000,
    orderBy: DaoTokenOwner_OrderBy.DaoTokenCount,
    orderDirection: OrderDirection.Desc
  })

  if (!data.daotokenOwners) throw new Error("No token owner found")

  const formattedMembers = await Promise.all(
    data.daotokenOwners.map(async (member) => {
      let tokenOwner = await applyL1ToL2Alias({
        l1ChainId: chainId,
        address: member.owner
      })

      return {
        address: tokenOwner,
        tokens: member.daoTokens.map((token) => token.tokenId)
      }
    })
  )

  return formattedMembers
}
