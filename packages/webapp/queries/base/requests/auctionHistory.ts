import * as Sentry from "@sentry/nextjs"

import { BaseSDK } from "queries/resolvers"
import { CHAIN_IDS } from "constants/types"

import { Auction_OrderBy, OrderDirection } from "../../subgraph/base/index.ts"

export const auctionHistoryRequest = async (chainId: CHAIN_IDS, collectionAddress: string, startTime: number) => {
  try {
    const data = await SDK.connect(chainId).auctionHistory({
      startTime,
      daoId: collectionAddress,
      orderDirection: OrderDirection.Asc,
      orderBy: Auction_OrderBy.EndTime,
      first: 1000
    })

    return data
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
  }
}
