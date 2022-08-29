import { model, Schema } from 'mongoose';

interface IState {
	key: string;
	value: string;
}

const StateSchema = new Schema<IState>({
	key: String,
	value: String,
});

// Compile model from schema
export const StateModel = model<IState>('State', StateSchema);
