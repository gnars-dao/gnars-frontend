import { IPayloadAction } from '../types';

export interface IEthereumState {
	reconnectInjected: boolean;
}

type IUpdateReconnectInjected = IPayloadAction<'updateReconnectInjected', { reconnectInjected: boolean }>;

export type IEthereumAction = IUpdateReconnectInjected;
