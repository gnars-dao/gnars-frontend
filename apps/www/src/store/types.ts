import { Action } from 'redux';

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type IActionType =
	| 'updateIsPaused'
	| 'updateCurrentGnarId'
	| 'updateRemainBlocks'
	| 'updateAuctionEndTimestamp'
	| 'updateMinimumBid'
	| 'updateReconnectInjected'
	| 'updateIsDarkBackground';

export interface IAction<T extends IActionType> extends Action<IActionType> {
	type: T;
}

export interface IPayloadAction<T extends IActionType, U extends Record<string, unknown>> extends IAction<T> {
	payload: U;
}
