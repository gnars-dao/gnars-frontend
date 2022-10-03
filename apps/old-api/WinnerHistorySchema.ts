import { model, Schema } from 'mongoose';

interface IWinnerHistory {
	gnarId: string;
	winner: string;
	amount: string;
}

const WinnerHistorySchema = new Schema<IWinnerHistory>({
	gnarId: String,
	winner: String,
	amount: String,
});

// Compile model from schema
export const WinnerHistoryModel = model<IWinnerHistory>('Winner', WinnerHistorySchema);
