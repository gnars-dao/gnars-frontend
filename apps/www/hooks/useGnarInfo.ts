import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query"
import { V2_START_ID } from "../utils/contracts"
import { getBuiltGraphSDK } from "../.graphclient"

export type Bid = {
  bidder: string
  amount: string
  blockTimestamp: string
  id: string
}

export type Gnar = {
  gnarId: string
  isLatestGnar: boolean
  owner: string
  isOg: boolean
  seed: {
    accessory: number
    background: number
    glasses: number
    body: number
    head: number
  }
  auction: {
    latestBidder: string | null
    latestBid: string | null
    bids: Bid[]
    startTimestamp: number
    endTimestamp: number
  } | null
}

export type OGGnar = Gnar & {
  isLatestGnar: false
  isOg: true
  auction: {
    latestBidder: string | null
    latestBid: string | null
    bids: Bid[]
    settled: true
  }
}

export type GnarV2 = Gnar & {
  isOg: false
  auction: {
    settled: boolean
    latestBidder: string | null
    latestBid: string | null
    bids: Bid[]
    startTimestamp: number
    endTimestamp: number
  } | null
}

export type GnarInfo = {
  gnar: GnarV2 | OGGnar
  latestGnarId: string
}

export const fetchGnarInfo = async (desiredGnarId?: number) => {
  const sdk = getBuiltGraphSDK()
  const isOg = desiredGnarId < V2_START_ID

  if (isOg) {
    const {
      ogAuction: {
        gnar: { accessory, glasses, body, head, owner, background },
        bidder,
        amount,
        bids,
        id: gnarId,
      },
      latestGnar: {
        [0]: { id: latestGnarId },
      },
    } = await sdk.OGGnar({ gnarId: `${desiredGnarId}` })

    const seed = {
      accessory,
      glasses,
      body,
      head,
      background,
    }

    return {
      latestGnarId,
      gnar: {
        isOg,
        isLatestGnar: false,
        gnarId,
        seed,
        owner,
        auction: {
          latestBidder: bidder ?? null,
          latestBid: amount ?? null,
          bids,
          settled: true,
        },
      } as OGGnar,
    }
  }

  const {
    latestGnar: {
      [0]: { id: latestGnarId },
    },
    gnars: {
      [0]: {
        seed,
        id: gnarId,
        owner: { id: owner },
        auction: auctionData,
      },
    },
  } = await sdk.Gnar({
    filter: desiredGnarId ? { id: `${desiredGnarId}` } : {},
  })

  const auction = auctionData
    ? {
        settled: auctionData.settled,
        latestBidder: auctionData.bidder?.id  ?? null,
        latestBid: auctionData.amount  ?? null,
        startTimestamp: auctionData.startTime,
        endTimestamp: auctionData.endTime,
        bids: auctionData.bids.map(
          ({ bidder: { id: bidder }, blockTimestamp, amount, id }) => ({
            bidder,
            blockTimestamp,
            amount,
            id,
          })
        ),
      }
    : null

  return {
    latestGnarId,
    gnar: {
      isOg,
      isLatestGnar: latestGnarId === gnarId,
      gnarId,
      seed,
      owner,
      auction,
    } as GnarV2,
  }
}

export default function useGnarInfo(
  desiredGnarId?: number,
  initialData?: GnarInfo
): UseQueryResult<GnarInfo> {
  return useQuery<GnarInfo, [string, number | undefined]>(
    ["gnar", desiredGnarId],
    () => fetchGnarInfo(desiredGnarId),
    {
      refetchInterval: 12000,
      initialData,
    }
  )
}
