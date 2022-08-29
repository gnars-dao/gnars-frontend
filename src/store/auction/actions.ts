import { IAuctionAction } from './types';

export const updateCurrentGnarId = (currentGnarId: bigint): IAuctionAction => ({
	type: 'updateCurrentGnarId',
	payload: { currentGnarId },
});

export const updateRemainBlocks = (
	remainBlocks: bigint | string,
	remainBlocksMajorVersion: bigint,
	override: boolean
): IAuctionAction => ({
	type: 'updateRemainBlocks',
	payload: { remainBlocks, remainBlocksMajorVersion, override },
});

export const updateAuctionEndTimestamp = (
	auctionEndTimestamp: bigint | string,
	auctionEndTimestampMajorVersion: bigint
): IAuctionAction => ({
	type: 'updateAuctionEndTimestamp',
	payload: { auctionEndTimestamp, auctionEndTimestampMajorVersion },
});

export const updateIsPaused = (
	isPaused: boolean,
	isPausedMajorVersion: bigint,
	isPausedMinorVersion: bigint,
	override: boolean
): IAuctionAction => ({
	type: 'updateIsPaused',
	payload: { isPaused, isPausedMajorVersion, isPausedMinorVersion, override },
});

export const updateMinimumBid = (
	minimumBid: bigint,
	minimumBidMajorVersion: bigint,
	override: boolean
): IAuctionAction => ({
	type: 'updateMinimumBid',
	payload: { minimumBid, minimumBidMajorVersion, override },
});
