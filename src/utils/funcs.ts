import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { BigNumberish } from '@ethersproject/bignumber';
import { utils } from 'ethers';
import { CHAIN_ID, ETHERSCAN_API_KEY, WSS_URL } from '../constants/env';
import { Bid } from './CommonTypes';

export const convertEther = (amount: BigNumberish): string => {
	const web3 = createAlchemyWeb3(WSS_URL);
	return web3.utils.fromWei(amount.toString(), 'ether');
};
export const TrancatedAmount = (amount: BigNumberish): string => {
	const ether_amount = utils.parseEther(amount.toString());
	return Number(utils.formatEther(ether_amount)).toFixed(3);
};

export const sortWithAmount = (list: Array<Bid>): Array<Bid> => {
	return list.sort((a: Bid, b: Bid) => Number(b.value) - Number(a.value));
};

const getBaseURL = (network: number) => {
	switch (network) {
		case 4:
			return 'https://rinkeby.etherscan.io/';
		default:
			return 'https://etherscan.io/';
	}
};

const BASE_URL = getBaseURL(CHAIN_ID);

export const buildEtherscanTxLink = (txHash: string): string => {
	const path = `tx/${txHash}`;
	return new URL(path, BASE_URL).toString();
};

export const buildEtherscanAddressLink = (address: string): string => {
	const path = `address/${address}`;
	return new URL(path, BASE_URL).toString();
};

const getApiBaseURL = (network: number) => {
	switch (network) {
		case 4:
			return `https://api-rinkeby.etherscan.io/`;
		default:
			return 'https://api.etherscan.io/';
	}
};

const API_BASE_URL = getApiBaseURL(CHAIN_ID);

export const buildEtherscanApiQuery = (address: string, module = 'contract', action = 'getsourcecode'): string => {
	const params = new URLSearchParams({
		module,
		action,
		address,
		apikey: ETHERSCAN_API_KEY,
	});
	const path = `api?${params.toString()}`;
	return new URL(path, API_BASE_URL).toString();
};
