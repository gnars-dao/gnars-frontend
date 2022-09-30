import { model, Schema } from 'mongoose';

interface IBidHistory {
	gnarId: string;
	sender: string;
	amount: string;
	timestamp: string;
	transactionHash: string;
}

const BidHistorySchema = new Schema<IBidHistory>({
	gnarId: String,
	sender: String,
	amount: String,
	timestamp: String,
	transactionHash: String,
});

// Compile model from schema
export const BidHistoryModel = model<IBidHistory>('BidHistory', BidHistorySchema);
