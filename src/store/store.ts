import { parse, stringify } from '@softstack/typed-stringify';
import { combineReducers, createStore } from 'redux';
import { mergeDeep } from '../utils/utils';
import { auctionReducer, initialAuctionState } from './auction/reducer';
import { IAuctionState } from './auction/types';
import { ethereumReducer, initialEthereumState } from './ethereum/reducer';
import { IEthereumState } from './ethereum/types';
import { initialStyleState, styleReducer } from './style/reducer';
import { IStyleState } from './style/types';
import { DeepPartial } from './types';

interface IState {
	auction: IAuctionState;
	ethereum: IEthereumState;
	style: IStyleState;
}

const storageKey = '6c310153e2bd4fc54d9b4fbd6bd0963de561eb6f54902990da9e7b916285ce73';

const rootReducer = combineReducers({ auction: auctionReducer, ethereum: ethereumReducer, style: styleReducer });

const loadLocalState = (): DeepPartial<IState> | undefined => {
	const serialisedState = localStorage.getItem(storageKey);
	if (serialisedState) {
		const state = parse(serialisedState) as DeepPartial<IState>;
		return state;
	}
	return undefined;
};

const saveLocalState = (state: IState) => {
	const localState: DeepPartial<IState> = {
		ethereum: {
			reconnectInjected: state.ethereum.reconnectInjected,
		},
	};
	localStorage.setItem(storageKey, stringify(localState));
};

const loadState = (): Partial<IState> => {
	const initialState: IState = {
		auction: initialAuctionState,
		ethereum: initialEthereumState,
		style: initialStyleState,
	};
	return mergeDeep(initialState, loadLocalState()) as Partial<IState>;
};

export const store = createStore(rootReducer, loadState());

store.subscribe(() => {
	saveLocalState(store.getState());
});

export type IRootState = ReturnType<typeof rootReducer>;
