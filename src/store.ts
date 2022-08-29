import { AlchemyWeb3, createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Store } from 'react-stores';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import SkateContractAbi from './abis/SkateContract.json';
import SkateContractV2Abi from './abis/SkateContractV2.json';
import SkateContractV2AuctionHouseAbi from './abis/SkateContractV2AuctionHouse.json';
import SkateSettleContractAbi from './abis/SkateSettleContract.json';
import {
	SKATE_ADDRESS,
	SKATE_SETTLE_ADDRESS,
	SKATE_V2_ADDRESS,
	SKATE_V2_AUCTION_HOUSE_ADDRESS,
	WSS_URL,
} from './constants/env';
import { Bid } from './utils/CommonTypes';

const web3 = createAlchemyWeb3(WSS_URL);
const skateContract = new web3.eth.Contract(SkateContractAbi as AbiItem[], SKATE_ADDRESS);
const skateSettleContract = new web3.eth.Contract(SkateSettleContractAbi as Array<AbiItem>, SKATE_SETTLE_ADDRESS);
const skateContractV2 = new web3.eth.Contract(SkateContractV2Abi as AbiItem[], SKATE_V2_ADDRESS);
const v2AuctionHouse = new web3.eth.Contract(
	SkateContractV2AuctionHouseAbi as AbiItem[],
	SKATE_V2_AUCTION_HOUSE_ADDRESS
);

export interface IWeb3State {
	web3Ins: AlchemyWeb3;
	skateContract: Contract;
	skateSettleContract: Contract;
	skateContractV2: Contract;
	v2AuctionHouse: Contract;
}

export const web3Store = new Store<IWeb3State>({
	web3Ins: web3,
	skateContract,
	skateSettleContract,
	skateContractV2,
	v2AuctionHouse,
});

export interface IBidListkState {
	bidList: Array<Bid>;
}

export const bidListStore = new Store<IBidListkState>({
	bidList: [],
});

export interface IDisplayGnarIdState {
	display_gnarId: bigint;
}
export const displayGnarIdStore = new Store<IDisplayGnarIdState>({
	display_gnarId: -1n,
});

export interface IGnarEnvState {
	auctionBG: number;
}

export const gnarEnvStore = new Store<IGnarEnvState>({
	auctionBG: 0,
});
