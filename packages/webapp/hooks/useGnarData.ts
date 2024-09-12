import { V2_START_ID } from "constants/gnarsDao";
import { GnarQuery, getBuiltGraphSDK } from "@subgraph-generated/layer-1";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export type Bid = {
  bidder: string;
  amount: string;
  blockTimestamp: string;
  id: string;
};

export interface GnarvingData {
  auctionDuration: number;
  auctionsBetweenGnarvings: number;
  auctionsUntilNextGnarving: number;
}

export type Gnar = {
  gnarId: string;
  isLatestGnar: boolean;
  owner: string;
  isOg: boolean;
  seed: {
    accessory: number;
    background: number;
    glasses: number;
    body: number;
    head: number;
  };
  auction: {
    latestBidder: string | null;
    latestBid: string | null;
    bids: Bid[];
    startTimestamp: number;
    endTimestamp: number;
  } | null;
};

export type OGGnar = Gnar & {
  isLatestGnar: false;
  isOg: true;
  auction: {
    latestBidder: string | null;
    latestBid: string | null;
    bids: Bid[];
    settled: true;
  };
};

export type GnarV2 = Gnar & {
  isOg: false;
  auction: {
    settled: boolean;
    latestBidder: string | null;
    latestBid: string | null;
    bids: Bid[];
    startTimestamp: number;
    endTimestamp: number;
  } | null;
};

export type GnarData = {
  block: NonNullable<GnarQuery["_meta"]>["block"];
  gnar: GnarV2 | OGGnar;
  latestGnarId: string;
  latestAuctionGnarId: string;
  gnarving: GnarvingData;
};

export const fetchGnarData = async (desiredGnarId?: number): Promise<GnarData> => {
  const sdk = getBuiltGraphSDK();
  const isOg = !!desiredGnarId && desiredGnarId < V2_START_ID;

  if (isOg) {
    const ogGnarQueryResponse = await sdk.OGGnar({ gnarId: `${desiredGnarId}` });

    if (!ogGnarQueryResponse || !ogGnarQueryResponse.ogAuction) {
      throw new Error("Couldn't get OG Gnar data");
    }

    const seed = {
      accessory: ogGnarQueryResponse.ogAuction.gnar.accessory,
      glasses: ogGnarQueryResponse.ogAuction.gnar.glasses,
      body: ogGnarQueryResponse.ogAuction.gnar.body,
      head: ogGnarQueryResponse.ogAuction.gnar.head,
      background: ogGnarQueryResponse.ogAuction.gnar.background
    };

    return {
      block: ogGnarQueryResponse._meta!.block,
      latestGnarId: ogGnarQueryResponse.latestGnar["0"].id,
      latestAuctionGnarId: ogGnarQueryResponse.latestAuction["0"].id,
      gnar: {
        isOg,
        isLatestGnar: false,
        gnarId: ogGnarQueryResponse.ogAuction.id,
        seed,
        owner: ogGnarQueryResponse.ogAuction.gnar.owner,
        auction: {
          latestBidder: ogGnarQueryResponse.ogAuction.bidder ?? null,
          latestBid: ogGnarQueryResponse.ogAuction.amount ?? null,
          bids: ogGnarQueryResponse.ogAuction.bids,
          settled: true
        }
      } as OGGnar,
      gnarving: ogGnarQueryResponse.gnarving!
    };
  }

  const gnarQueryResponse = await sdk.Gnar({
    filter: desiredGnarId ? { id: `${desiredGnarId}` } : { auction_not: null }
  });

  const {
    latestGnar: {
      [0]: { id: latestGnarId }
    },
    latestAuction: {
      [0]: { id: latestAuctionGnarId }
    },
    gnars: {
      [0]: {
        seed,
        id: gnarId,
        owner: { id: owner },
        auction: auctionData
      }
    },
    gnarving
  } = gnarQueryResponse;

  const auction = auctionData
    ? {
        settled: auctionData.settled,
        latestBidder: auctionData.bidder?.id ?? null,
        latestBid: auctionData.amount ?? null,
        startTimestamp: auctionData.startTime,
        endTimestamp: auctionData.endTime,
        bids: auctionData.bids.map((bid) => ({
          bidder: bid.bidder?.id,
          blockTimestamp: bid.blockTimestamp,
          amount: bid.amount,
          id: bid.id
        }))
      }
    : null;

  return {
    block: gnarQueryResponse._meta!.block,
    latestGnarId,
    latestAuctionGnarId,
    gnar: {
      isOg,
      isLatestGnar: latestGnarId === gnarId,
      gnarId,
      seed,
      owner,
      auction
    } as GnarV2,
    gnarving: gnarving!
  };
};

export default function useGnarData(desiredGnarId?: number, initialData?: GnarData): UseQueryResult<GnarData> {
  // https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#supports-a-single-signature-one-object
  return useQuery<GnarData, Error>({
    queryKey: ["gnar", desiredGnarId],
    queryFn: () => fetchGnarData(desiredGnarId),
    refetchInterval: 2000,
    initialData
  });
}
