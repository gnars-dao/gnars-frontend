import { CHAIN_IDS } from "typings"

import { SDK } from "../client"
import { OrderDirection, Token_OrderBy, TokenFragment } from "../../subgraph/base/index.ts"

export interface TokensQueryResponse {
  tokens: TokenFragment[]
  hasNextPage: boolean
}

export const tokensQuery = async (chain: CHAIN_IDS, owner: string, page?: number): Promise<TokensQueryResponse> => {
  const limit = 12
  const res = await SDK.connect(chain).tokens({
    where: {
      owner: owner.toLowerCase()
    },
    orderBy: Token_OrderBy.MintedAt,
    orderDirection: OrderDirection.Desc,
    skip: page ? (page - 1) * limit : undefined,
    first: limit
  })

  return {
    tokens: res.tokens,
    hasNextPage: res.tokens.length === limit
  }
}
