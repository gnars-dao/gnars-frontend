import { IStyleAction } from './types';

export const updateIsDarkBackground = (isDarkBackground: boolean): IStyleAction => ({
	type: 'updateIsDarkBackground',
	payload: { isDarkBackground },
});
