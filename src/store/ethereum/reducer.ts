import { IEthereumAction, IEthereumState } from './types';

export const initialEthereumState: IEthereumState = {
	reconnectInjected: false,
};

export const ethereumReducer = (state = initialEthereumState, action: IEthereumAction): IEthereumState => {
	switch (action.type) {
		case 'updateReconnectInjected':
			return { ...state, reconnectInjected: action.payload.reconnectInjected };
		default:
			return state;
	}
};
