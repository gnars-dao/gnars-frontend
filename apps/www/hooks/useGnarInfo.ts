import { useQuery, UseQueryResult } from "@tanstack/react-query"
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
  auction?: {
    latestBidder?: string
    latestBid?: string
    bids: Bid[]
    startTimestamp: number
    endTimestamp: number
  }
}

export type OGGnar = Gnar & {
  isLatestGnar: false
  isOg: true
  auction: { latestBidder?: string; latestBid?: string; bids: Bid[] }
}

export type GnarV2 = Gnar & {
  isOg: false
  auction?: {
    latestBidder?: string
    latestBid?: string
    bids: Bid[]
    startTimestamp: number
    endTimestamp: number
  }
}

export type GnarInfo = {
  desiredGnarId?: number
  gnar: GnarV2 | OGGnar
  latestGnarId: string
}

export default function useGnarInfo(desiredGnarId?: number) {
  const sdk = getBuiltGraphSDK()
  return useQuery<GnarInfo>(
    ["gnar", desiredGnarId],
    async () => {
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
          desiredGnarId,
          latestGnarId,
          gnar: {
            isOg,
            isLatestGnar: false,
            gnarId,
            seed,
            owner,
            auction: { latestBidder: bidder, latestBid: amount, bids },
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
            latestBidder: auctionData.bidder?.id,
            latestBid: auctionData.amount,
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
        : undefined

      return {
        desiredGnarId,
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
    },
    {
      refetchInterval: 12000,
    }
  )
}
