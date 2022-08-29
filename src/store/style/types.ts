import { IPayloadAction } from '../types';

export interface IStyleState {
	isDarkBackground: boolean;
}

type IUpdateIsDarkBackground = IPayloadAction<'updateIsDarkBackground', { isDarkBackground: boolean }>;

export type IStyleAction = IUpdateIsDarkBackground;
