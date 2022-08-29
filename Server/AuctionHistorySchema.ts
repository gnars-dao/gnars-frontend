import { model, Schema } from 'mongoose';

interface IAuctionHistory {
	gnarId: string;
	date: string;
}

const AuctionHistorySchema = new Schema<IAuctionHistory>({
	gnarId: String,
	date: String,
});

// Compile model from schema
export const AuctionHistoryModel = model<IAuctionHistory>('AuctionHistory', AuctionHistorySchema);
