import WebSocket from 'ws';

export interface ExtWebSocket extends WebSocket {
	isAlive: boolean;
}

type IEventType = 'remainBlocks' | 'auctionEndTimestamp' | 'paused' | 'gnarId' | 'minimumBid';

interface IBaseEvent<T extends IEventType, U> {
	type: T;
	payload: U;
}

export type IRemainBlocksEvent = IBaseEvent<
	'remainBlocks',
	{
		remainBlocks: bigint | null;
		majorVersion: bigint;
	}
>;

export type IAuctionEndTimestampEvent = IBaseEvent<
	'auctionEndTimestamp',
	{ auctionEndTimestamp: bigint | null; majorVersion: bigint }
>;

export type IPausedEvent = IBaseEvent<
	'paused',
	{
		isPaused: boolean;
		majorVersion: bigint;
		minorVersion: bigint;
	}
>;

export type IGnarIdEvent = IBaseEvent<'gnarId', { currentGnarId: bigint }>;

export type IMinimumBidEvent = IBaseEvent<'minimumBid', { minimumBid: bigint; majorVersion: bigint }>;
