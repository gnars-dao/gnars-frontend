import { IEthereumAction } from './types';

export const updateReconnectInjected = (reconnectInjected: boolean): IEthereumAction => ({
	type: 'updateReconnectInjected',
	payload: { reconnectInjected },
});
