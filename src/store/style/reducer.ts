import { IStyleAction, IStyleState } from './types';

export const initialStyleState: IStyleState = {
	isDarkBackground: false,
};

export const styleReducer = (state = initialStyleState, action: IStyleAction): IStyleState => {
	switch (action.type) {
		case 'updateIsDarkBackground':
			return { ...state, isDarkBackground: action.payload.isDarkBackground };
		default:
			return state;
	}
};
