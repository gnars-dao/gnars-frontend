import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { stringify } from '@softstack/typed-stringify';
import { AbiItem } from 'web3-utils/types';
import WebSocket from 'ws';
import skateContractAbi from './abis/SkateContract.json';
import skateContractV2AuctionHouseAbi from './abis/SkateContractV2AuctionHouse.json';
import { SKATE_ADDRESS, SKATE_V2_AUCTION_HOUSE_ADDRESS, V2_START_ID, WSS_URL } from './constants/env';
import { IAuctionEndTimestampEvent, IGnarIdEvent, IMinimumBidEvent, IPausedEvent, IRemainBlocksEvent } from './types';
import {
	getStartBlockNumber,
	getVersion,
	hasV2Started,
	saveAuctionHistory,
	saveBidHistory,
	saveLastScannedBlockNumber,
	saveWinnerHistory,
} from './utils';
import { VersionedValue } from './versionedValue';

const remainBlocks = new VersionedValue<bigint | null>(null);
const auctionEndTimestamp = new VersionedValue<bigint | null>(null);
const isPaused = new VersionedValue<boolean>(false);
const currentGnarId = new VersionedValue<bigint>(0n);
const reservePrice = new VersionedValue<bigint>(0n);
const minBidIncrementPercentage = new VersionedValue<bigint>(0n);
const lastBid = new VersionedValue<bigint>(0n);
const minimumBid = new VersionedValue<bigint>(0n, 1n);
let isLoading = true;

export const getIsLoading = () => isLoading;

export const getRemainBlocks = (): bigint | null => {
	return remainBlocks.getPayload();
};

export const getAuctionEndTimestamp = (): bigint | null => {
	return auctionEndTimestamp.getPayload();
};

export const getIsPaused = (): boolean => isPaused.getPayload();

export const getCurrentGnarId = (): bigint => currentGnarId.getPayload();

export const getMinimumBid = (): bigint => minimumBid.getPayload();

export const observe = async (wss: WebSocket.Server<WebSocket.WebSocket>) => {
	try {
		const web3 = createAlchemyWeb3(WSS_URL);
		web3.eth.handleRevert = true;
		const skateContract = new web3.eth.Contract(skateContractAbi as Array<AbiItem>, SKATE_ADDRESS);
		const skateContractV2AuctionHouse = SKATE_V2_AUCTION_HOUSE_ADDRESS
			? new web3.eth.Contract(skateContractV2AuctionHouseAbi as Array<AbiItem>, SKATE_V2_AUCTION_HOUSE_ADDRESS)
			: undefined;

		const broadcast = (data: string) => {
			wss.clients.forEach((ws) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(data);
				}
			});
		};

		currentGnarId.addListener(() => {
			const event: IGnarIdEvent = {
				type: 'gnarId',
				payload: { currentGnarId: currentGnarId.getPayload() },
			};
			broadcast(stringify(event));
		});

		remainBlocks.addListener(() => {
			const event: IRemainBlocksEvent = {
				type: 'remainBlocks',
				payload: { remainBlocks: remainBlocks.getPayload(), majorVersion: remainBlocks.getMajorVersion() },
			};
			broadcast(stringify(event));
		});

		auctionEndTimestamp.addListener(() => {
			const event: IAuctionEndTimestampEvent = {
				type: 'auctionEndTimestamp',
				payload: {
					auctionEndTimestamp: auctionEndTimestamp.getPayload(),
					majorVersion: auctionEndTimestamp.getMajorVersion(),
				},
			};
			broadcast(stringify(event));
		});

		isPaused.addListener(() => {
			const event: IPausedEvent = {
				type: 'paused',
				payload: {
					isPaused: isPaused.getPayload(),
					majorVersion: isPaused.getMajorVersion(),
					minorVersion: isPaused.getMinorVersion(),
				},
			};
			broadcast(stringify(event));
		});

		const handleBidPriceUpdate = () => {
			const roundish = (value: bigint) => {
				return (value / BigInt(10 ** 15) + 1n) * BigInt(10 ** 15);
			};

			const calculateMinimumBid = (reservedPrice: bigint, percent: bigint, amount: bigint) => {
				if (amount <= 0) {
					return roundish(reservedPrice);
				}
				return roundish(amount + (amount * percent) / 100n);
			};

			minimumBid.incrementalUpdate(
				calculateMinimumBid(reservePrice.getPayload(), minBidIncrementPercentage.getPayload(), lastBid.getPayload())
			);
		};

		minimumBid.addListener(() => {
			const event: IMinimumBidEvent = {
				type: 'minimumBid',
				payload: {
					minimumBid: minimumBid.getPayload(),
					majorVersion: minimumBid.getMajorVersion(),
				},
			};
			broadcast(stringify(event));
		});

		reservePrice.addListener(handleBidPriceUpdate);
		minBidIncrementPercentage.addListener(handleBidPriceUpdate);
		lastBid.addListener(handleBidPriceUpdate);

		const startBlockNumber = await getStartBlockNumber();
		// const startBlockNumber = '10388070';
		let lastSecuredEthereumBlockNum: bigint = startBlockNumber === 'latest' ? 0n : BigInt(startBlockNumber);
		// let lastSecuredEthereumBlockNum: number = Number(startBlockNumber);

		const version = await getVersion();
		if (version === 1) {
			const auction = await skateContract.methods.auction().call();
			currentGnarId.enforceUpdate(BigInt(auction.gnarId));
			lastBid.enforceUpdate(BigInt(auction.amount));
			const newReservePrice = await skateContract.methods.reservePrice().call();
			reservePrice.enforceUpdate(BigInt(newReservePrice));
			const newMinBidIncrementPercentage = await skateContract.methods.minBidIncrementPercentage().call();
			minBidIncrementPercentage.enforceUpdate(BigInt(newMinBidIncrementPercentage));
			const blockNumber = await web3.eth.getBlockNumber();
			try {
				const result = await skateContract.methods.remainBlocks().call();
				if (result !== null && result !== undefined) {
					remainBlocks.update(BigInt(result), BigInt(blockNumber));
				}
			} catch (e: any) {
				if (e.message.includes('No remain blocks!')) {
					remainBlocks.update(-1n, BigInt(blockNumber));
				}
			}
		} else if (version === 2 && skateContractV2AuctionHouse) {
			const newIsPaused = Boolean(await skateContractV2AuctionHouse.methods.paused().call());
			isPaused.enforceUpdate(newIsPaused);
			const auction = await skateContractV2AuctionHouse.methods.auction().call();
			const newCurrentGnarId = BigInt(auction.gnarId);
			if (newCurrentGnarId === 0n) {
				currentGnarId.enforceUpdate(V2_START_ID);
			} else {
				currentGnarId.enforceUpdate(newCurrentGnarId);
				auctionEndTimestamp.update(BigInt(auction.endTimestamp), BigInt(newCurrentGnarId));
			}
			lastBid.enforceUpdate(BigInt(auction.amount));
			const newReservePrice = await skateContractV2AuctionHouse.methods.reservePrice().call();
			reservePrice.enforceUpdate(BigInt(newReservePrice));
			const newMinBidIncrementPercentage = await skateContractV2AuctionHouse.methods.minBidIncrementPercentage().call();
			minBidIncrementPercentage.enforceUpdate(BigInt(newMinBidIncrementPercentage));
		}

		isLoading = false;

		await new Promise((resolve, reject) => {
			// event if auction is created
			skateContract.events
				.AuctionCreated({
					fromBlock: startBlockNumber,
				})
				.on('data', async (event: any) => {
					const {
						blockNumber,
						logIndex,
						returnValues: { gnarId },
					} = event;
					if (BigInt(gnarId) < V2_START_ID) {
						await saveAuctionHistory(gnarId, new Date());
						lastBid.update(0n, BigInt(blockNumber), BigInt(logIndex));
						currentGnarId.update(BigInt(gnarId), BigInt(gnarId));
					}
				})
				.on('error', reject);

			skateContract.events
				.AuctionBid({
					fromBlock: startBlockNumber,
				})
				.on('data', async (event: any) => {
					const {
						blockNumber,
						logIndex,
						returnValues: { gnarId, sender, value, timestamp },
					} = event;
					if (BigInt(gnarId) < V2_START_ID) {
						await saveBidHistory(gnarId, sender, value, timestamp, event.transactionHash);
						lastBid.update(BigInt(value), BigInt(blockNumber), BigInt(logIndex));
					}
				})
				.on('error', reject);

			// event if auction is settled
			skateContract.events
				.AuctionSettled({
					fromBlock: startBlockNumber,
				})
				.on('data', async (event: any) => {
					const {
						blockNumber,
						logIndex,
						returnValues: { gnarId, winner, amount },
					} = event;
					if (BigInt(gnarId) === V2_START_ID - 1n && !(await hasV2Started())) {
						isPaused.update(true, BigInt(blockNumber), BigInt(logIndex));
					}
					if (BigInt(gnarId) < V2_START_ID) {
						await saveWinnerHistory(gnarId, winner, amount);
						if (BigInt(gnarId) === V2_START_ID - 1n) {
							currentGnarId.update(BigInt(gnarId) + 1n, BigInt(gnarId) + 1n);
						}
					}
				})
				.on('error', reject);

			skateContract.events
				.ReservePriceUpdated({
					fromBlock: 'latest',
				})
				.on('data', async (event: any) => {
					const {
						blockNumber,
						logIndex,
						returnValues: { price },
					} = event;
					if ((await getVersion()) === 1) {
						reservePrice.update(BigInt(price), BigInt(blockNumber), BigInt(logIndex));
					}
				})
				.on('error', reject);

			skateContract.events
				.MinBidIncrementPercentageUpdated({
					fromBlock: 'latest',
				})
				.on('data', async (event: any) => {
					const {
						blockNumber,
						logIndex,
						returnValues: { price },
					} = event;
					if ((await getVersion()) === 1) {
						minBidIncrementPercentage.update(BigInt(price), BigInt(blockNumber), BigInt(logIndex));
					}
				})
				.on('error', reject);

			if (skateContractV2AuctionHouse) {
				skateContractV2AuctionHouse.events
					.AuctionCreated({ fromBlock: startBlockNumber })
					.on('data', async (event: any) => {
						const {
							blockNumber,
							logIndex,
							returnValues: { gnarId, endTimestamp, timestamp },
						} = event;
						const date = new Date(Number(timestamp) * 1000);
						await saveAuctionHistory(gnarId, date);
						lastBid.update(0n, BigInt(blockNumber), BigInt(logIndex));
						currentGnarId.update(BigInt(gnarId), BigInt(gnarId));
						auctionEndTimestamp.update(BigInt(endTimestamp), BigInt(gnarId));
					})
					.on('error', reject);

				skateContractV2AuctionHouse.events
					.AuctionBid({ fromBlock: startBlockNumber })
					.on('data', async (event: any) => {
						const {
							blockNumber,
							logIndex,
							returnValues: { gnarId, sender, value, timestamp },
						} = event;
						await saveBidHistory(gnarId, sender, value, timestamp, event.transactionHash);
						lastBid.update(BigInt(value), BigInt(blockNumber), BigInt(logIndex));
					})
					.on('error', reject);

				skateContractV2AuctionHouse.events
					.AuctionSettled({
						fromBlock: startBlockNumber,
					})
					.on('data', async (event: any) => {
						const {
							returnValues: { gnarId, winner, amount },
						} = event;
						await saveWinnerHistory(gnarId, winner, amount);
					})
					.on('error', reject);

				skateContractV2AuctionHouse.events.Paused({ fromBlock: 'latest' }).on('data', async (event: any) => {
					const { blockNumber, logIndex } = event;
					if ((await getVersion()) === 2) {
						isPaused.update(true, BigInt(blockNumber), BigInt(logIndex));
					}
				});

				skateContractV2AuctionHouse.events.Unpaused({ fromBlock: 'latest' }).on('data', async (event: any) => {
					const { blockNumber, logIndex } = event;
					if ((await getVersion()) === 2) {
						isPaused.update(false, BigInt(blockNumber), BigInt(logIndex));
					}
				});

				skateContractV2AuctionHouse.events
					.AuctionReservePriceUpdated({
						fromBlock: 'latest',
					})
					.on('data', async (event: any) => {
						const {
							blockNumber,
							logIndex,
							returnValues: { reservePrice },
						} = event;
						if ((await getVersion()) === 2) {
							reservePrice.update(BigInt(reservePrice), BigInt(blockNumber), BigInt(logIndex));
						}
					})
					.on('error', reject);

				skateContractV2AuctionHouse.events
					.AuctionMinBidIncrementPercentageUpdated({
						fromBlock: 'latest',
					})
					.on('data', async (event: any) => {
						const {
							blockNumber,
							logIndex,
							returnValues: { minBidIncrementPercentage },
						} = event;
						if ((await getVersion()) === 2) {
							minBidIncrementPercentage.update(
								BigInt(minBidIncrementPercentage),
								BigInt(blockNumber),
								BigInt(logIndex)
							);
						}
					})
					.on('error', reject);
			}

			web3.eth
				.subscribe('newBlockHeaders')
				.on('data', async (blockHeader) => {
					// Sets (current_block_number - 100) as scanned
					const blockNumber = BigInt(blockHeader.number);
					const newLastSecuredEthereumBlockNum = blockNumber - 100n;
					if (newLastSecuredEthereumBlockNum > lastSecuredEthereumBlockNum) {
						await saveLastScannedBlockNumber(newLastSecuredEthereumBlockNum);
						lastSecuredEthereumBlockNum = newLastSecuredEthereumBlockNum;
					}

					try {
						if ((await getVersion()) === 1) {
							const result = await skateContract.methods.remainBlocks().call();
							if (result !== null && result !== undefined) {
								remainBlocks.update(BigInt(result), BigInt(blockNumber));
							}
						}
					} catch (e: any) {
						if (e.message.includes('No remain blocks!')) {
							remainBlocks.update(-1n, BigInt(blockNumber));
						} else {
							reject(e);
						}
					}
				})
				.on('error', reject);
			console.log('Observer initialised');
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};
