import { IPayloadAction } from '../types';

export interface IAuctionState {
	currentGnarId: bigint;
	remainBlocks: bigint | string;
	remainBlocksMajorVersion: bigint;
	auctionEndTimestamp: bigint | string;
	auctionEndTimestampMajorVersion: bigint;
	isPaused: boolean;
	isPausedMajorVersion: bigint;
	isPausedMinorVersion: bigint;
	minimumBid: bigint;
	minimumBidMajorVersion: bigint;
}

type IUpdateCurrentGnarId = IPayloadAction<'updateCurrentGnarId', { currentGnarId: bigint }>;

type IUpdateRemainBlocks = IPayloadAction<
	'updateRemainBlocks',
	{ remainBlocks: bigint | string; remainBlocksMajorVersion: bigint; override: boolean }
>;

type IUpdateAuctionEndTimestamp = IPayloadAction<
	'updateAuctionEndTimestamp',
	{ auctionEndTimestamp: bigint | string; auctionEndTimestampMajorVersion: bigint }
>;

type IUpdateIsPaused = IPayloadAction<
	'updateIsPaused',
	{ isPaused: boolean; isPausedMajorVersion: bigint; isPausedMinorVersion: bigint; override: boolean }
>;

type IUpdateMinimumBid = IPayloadAction<
	'updateMinimumBid',
	{ minimumBid: bigint; minimumBidMajorVersion: bigint; override: boolean }
>;

export type IAuctionAction =
	| IUpdateCurrentGnarId
	| IUpdateRemainBlocks
	| IUpdateAuctionEndTimestamp
	| IUpdateIsPaused
	| IUpdateMinimumBid;
