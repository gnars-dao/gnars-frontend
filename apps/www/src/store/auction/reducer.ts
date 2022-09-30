import { IAuctionAction, IAuctionState } from './types';

export const initialAuctionState: IAuctionState = {
	currentGnarId: -1n,
	remainBlocks: 'Loading',
	remainBlocksMajorVersion: -1n,
	auctionEndTimestamp: 'Loading',
	auctionEndTimestampMajorVersion: -1n,
	isPaused: true,
	isPausedMajorVersion: -1n,
	isPausedMinorVersion: -1n,
	minimumBid: 0n,
	minimumBidMajorVersion: -1n,
};

export const auctionReducer = (state = initialAuctionState, action: IAuctionAction): IAuctionState => {
	switch (action.type) {
		case 'updateCurrentGnarId':
			if (action.payload.currentGnarId > state.currentGnarId) {
				return { ...state, currentGnarId: action.payload.currentGnarId };
			}
			return state;
		case 'updateRemainBlocks':
			if (action.payload.override) {
				return { ...state, remainBlocks: action.payload.remainBlocks };
			} else if (action.payload.remainBlocksMajorVersion > state.remainBlocksMajorVersion) {
				return {
					...state,
					remainBlocks: action.payload.remainBlocks,
					remainBlocksMajorVersion: action.payload.remainBlocksMajorVersion,
				};
			}
			return state;
		case 'updateAuctionEndTimestamp':
			if (action.payload.auctionEndTimestampMajorVersion > state.auctionEndTimestampMajorVersion) {
				return {
					...state,
					auctionEndTimestamp: action.payload.auctionEndTimestamp,
					auctionEndTimestampMajorVersion: action.payload.auctionEndTimestampMajorVersion,
				};
			}
			return state;
		case 'updateIsPaused':
			if (action.payload.override) {
				return { ...state, isPaused: action.payload.isPaused };
			} else if (
				action.payload.isPausedMajorVersion > state.isPausedMajorVersion ||
				(action.payload.isPausedMajorVersion === state.isPausedMajorVersion &&
					action.payload.isPausedMinorVersion > state.isPausedMinorVersion)
			) {
				return {
					...state,
					isPaused: action.payload.isPaused,
					isPausedMajorVersion: action.payload.isPausedMajorVersion,
					isPausedMinorVersion: action.payload.isPausedMinorVersion,
				};
			}
			return state;
		case 'updateMinimumBid':
			if (action.payload.override) {
				return { ...state, minimumBid: action.payload.minimumBid };
			} else if (action.payload.minimumBidMajorVersion > state.minimumBidMajorVersion) {
				return {
					...state,
					minimumBid: action.payload.minimumBid,
					minimumBidMajorVersion: action.payload.minimumBidMajorVersion,
				};
			}
			return state;
		default:
			return state;
	}
};
