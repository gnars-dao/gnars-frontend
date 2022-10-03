import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AuctionHistoryModel } from './AuctionHistorySchema';
import { BidHistoryModel } from './BidHistorySchema';
import { ENFORCE_VERSION, INITIAL_SUBSCRIPTION_BLOCK, V2_START_ID } from './constants/env';
import { StateModel } from './StateSchema';
import { WinnerHistoryModel } from './WinnerHistorySchema';

dayjs.extend(utc);

const lastScannedBlockNumberKey = 'lastScannedBlockNumber';

export const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));

export const getStartBlockNumber = async (): Promise<string> => {
	const result = await StateModel.findOne({ key: lastScannedBlockNumberKey });
	if (result) {
		return result.value;
	}
	return INITIAL_SUBSCRIPTION_BLOCK;
};

export const saveLastScannedBlockNumber = async (blockNumber: bigint) => {
	await StateModel.updateOne(
		{ key: lastScannedBlockNumberKey },
		{ $set: { value: blockNumber.toString() } },
		{ upsert: true }
	);
};

let saveBidHistoryMutex = false;

export const saveBidHistory = async (
	gnarId: string,
	sender: string,
	amount: string,
	timestamp: string,
	transactionHash: string
) => {
	while (saveBidHistoryMutex) {
		await sleep(0);
	}
	try {
		saveBidHistoryMutex = true;
		if (!(await BidHistoryModel.findOne({ transactionHash }))) {
			const bidHistory = new BidHistoryModel({
				gnarId,
				sender,
				amount,
				timestamp,
				transactionHash,
			});
			try {
				await bidHistory.save();
			} catch (error) {
				console.log('Saving bid history error: ', error);
			}
		}
	} finally {
		saveBidHistoryMutex = false;
	}
};

let saveWinnerHistoryMutex = false;

export const saveWinnerHistory = async (gnarId: string, winner: string, amount: string) => {
	while (saveWinnerHistoryMutex) {
		await sleep(0);
	}
	try {
		saveWinnerHistoryMutex = true;
		if (!(await WinnerHistoryModel.findOne({ gnarId }))) {
			const winnerHistory = new WinnerHistoryModel({
				gnarId,
				winner,
				amount,
			});
			try {
				await winnerHistory.save();
			} catch (error) {
				console.log('Saving winner history error: ', error);
			}
		}
	} finally {
		saveWinnerHistoryMutex = false;
	}
};

let saveAuctionHistoryMutex = false;

export const saveAuctionHistory = async (gnarId: string, date: Date) => {
	while (saveAuctionHistoryMutex) {
		await sleep(0);
	}
	try {
		saveAuctionHistoryMutex = true;
		if (!(await AuctionHistoryModel.findOne({ gnarId }))) {
			const auctionHistory = new AuctionHistoryModel({
				gnarId,
				date: date.toISOString(),
			});
			try {
				await auctionHistory.save();
			} catch (error) {
				console.log('Saving auction history error: ', error);
			}
		}
	} finally {
		saveAuctionHistoryMutex = false;
	}
};

export const getVersion = async (): Promise<number> => {
	if (ENFORCE_VERSION > 0) {
		return ENFORCE_VERSION;
	} else if (await WinnerHistoryModel.findOne({ gnarId: (V2_START_ID - 1n).toString() })) {
		return 2;
	}
	return 1;
};

export const hasV2Started = async (): Promise<boolean> =>
	!!(await AuctionHistoryModel.findOne({ gnarId: (V2_START_ID + 1n).toString() }));

export const isNewerEvent = (
	oldBlockNumber: number,
	oldLogIndex: number,
	newBlockNumber: number,
	newLogIndex: number
): boolean => oldBlockNumber < newBlockNumber || (oldBlockNumber === newBlockNumber && oldLogIndex < newLogIndex);

const hasOwnProperty = <X, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> =>
	Object.prototype.hasOwnProperty.call(obj, prop);

export const errorToString = (error: unknown): string => {
	if (typeof error === 'string') {
		return error;
	}
	if (typeof error === 'number' || typeof error === 'bigint' || typeof error === 'boolean') {
		return error.toString();
	}
	if (typeof error === 'object' && error && error.toString() !== '[object Object]') {
		return error.toString();
	}
	if (typeof error === 'object' && error && hasOwnProperty(error, 'message') && typeof error.message === 'string') {
		return error.message;
	}
	if (typeof error === 'object') {
		return JSON.stringify(error);
	}
	return `${error}`;
};
