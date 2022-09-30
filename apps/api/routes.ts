import { stringify } from '@softstack/typed-stringify';
import { AsyncRouter } from 'express-async-router';
import { AuctionHistoryModel } from './AuctionHistorySchema';
import { BidHistoryModel } from './BidHistorySchema';
import {
	getAuctionEndTimestamp,
	getCurrentGnarId,
	getIsLoading,
	getIsPaused,
	getMinimumBid,
	getRemainBlocks,
} from './observe';
import { sleep } from './utils';
import { WinnerHistoryModel } from './WinnerHistorySchema';

export const routes = AsyncRouter();

routes.post('/getBidHistory', async (req, res) => {
	const gnarId = req.body.gnarId;
	const history = await BidHistoryModel.find({ gnarId: gnarId });
	res.send(stringify({ history: history.map((history) => history.toObject()) }));
});

routes.post('/getWinner', async (req, res) => {
	const gnarId = req.body.gnarId;
	const winner = await WinnerHistoryModel.find({ gnarId: gnarId });
	res.send(stringify({ winner: winner.map((winner) => winner.toObject()) }));
});

routes.post('/getAuction', async (req, res) => {
	const gnarId = req.body.gnarId;
	const auction = await AuctionHistoryModel.find({ gnarId: gnarId });
	res.send(stringify({ auction: auction.map((auction) => auction.toObject()) }));
});

routes.post('/getAllHistories', async (req, res) => {
	const gnarId = req.body.gnarId;
	const history = await BidHistoryModel.find({ gnarId: gnarId });
	const winner = await WinnerHistoryModel.find({ gnarId: gnarId });
	const auction = await AuctionHistoryModel.find({ gnarId: gnarId });
	res.send(
		stringify({
			winner: winner.map((winner) => winner.toObject()),
			history: history.map((history) => history.toObject()),
			auction: auction.map((auction) => auction.toObject()),
		})
	);
});

routes.post('/getRemainBlocks', async (req, res) => {
	const remainBlocks = getRemainBlocks();
	res.send(stringify({ remainBlocks }));
});

routes.post('/getAuctionEndTimestamp', async (req, res) => {
	const auctionEndTimestamp = getAuctionEndTimestamp();
	res.send(stringify({ auctionEndTimestamp }));
});

routes.post('/getIsPaused', async (req, res) => {
	while (getIsLoading()) {
		await sleep(100);
	}
	const isPaused = getIsPaused();
	res.send(stringify({ isPaused }));
});

routes.post('/getCurrentGnarId', async (req, res) => {
	while (getIsLoading()) {
		await sleep(100);
	}
	const currentGnarId = getCurrentGnarId();
	res.send(stringify({ currentGnarId }));
});

routes.post('/getMinimumBid', async (req, res) => {
	while (getIsLoading()) {
		await sleep(100);
	}
	const minimumBid = getMinimumBid();
	res.send(stringify({ minimumBid }));
});
