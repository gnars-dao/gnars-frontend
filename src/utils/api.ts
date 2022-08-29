import { parse } from '@softstack/typed-stringify';
import { BACKEND_URL } from '../constants/env';

const throwOnError = (response: Response) => {
	const { status, statusText } = response;
	if (status < 200 || status >= 300) {
		throw new Error(statusText);
	}
};

export const getCurrentGnarId = (): Promise<bigint> =>
	fetch(`${BACKEND_URL}/api/getCurrentGnarId`, {
		method: 'POST',
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then((data) => {
			const { currentGnarId } = parse(data) as { currentGnarId: bigint };
			return currentGnarId;
		});

export const getRemainBlocks = (): Promise<bigint | null> =>
	fetch(`${BACKEND_URL}/api/getRemainBlocks`, {
		method: 'POST',
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then((data) => {
			const { remainBlocks } = parse(data) as { remainBlocks: bigint | null };
			return remainBlocks;
		});

export const getAuctionEndTimestamp = (): Promise<bigint | null> =>
	fetch(`${BACKEND_URL}/api/getAuctionEndTimestamp`, {
		method: 'POST',
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then((data) => {
			const { auctionEndTimestamp } = parse(data) as { auctionEndTimestamp: bigint | null };
			return auctionEndTimestamp;
		});

export const getIsPaused = (): Promise<boolean> =>
	fetch(`${BACKEND_URL}/api/getIsPaused`, { method: 'POST' })
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then((data) => {
			const { isPaused } = parse(data) as { isPaused: boolean };
			return isPaused;
		});

export const getMinimumBid = (): Promise<bigint> =>
	fetch(`${BACKEND_URL}/api/getMinimumBid`, { method: 'POST' })
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then((data) => {
			const { minimumBid } = parse(data) as { minimumBid: bigint };
			return minimumBid;
		});

export const getBidHistory = (
	gnarId: bigint
): Promise<Array<{ gnarId: string; sender: string; amount: string; timestamp: string; transactionHash: string }>> =>
	fetch(`${BACKEND_URL}/api/getBidHistory`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			gnarId: gnarId.toString(),
		}),
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then(async (data) => {
			const { history } = parse(data) as { history: any };
			return history;
		});

export const getWinner = (gnarId: bigint): Promise<any> =>
	fetch(`${BACKEND_URL}/api/getWinner`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			gnarId: gnarId.toString(),
		}),
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then(async (data) => {
			const { winner } = parse(data) as { winner: any };
			return winner;
		});

export const getAuction = (gnarId: bigint): Promise<any> =>
	fetch(`${BACKEND_URL}/api/getAuction`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			gnarId: gnarId.toString(),
		}),
	})
		.then((response) => {
			throwOnError(response);
			return response.text();
		})
		.then(async (data) => {
			const { auction } = parse(data) as { auction: any };
			return auction;
		});
