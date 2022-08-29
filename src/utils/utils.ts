import { BigNumber } from 'bignumber.js';
import { bidListStore } from '../store';
import { getBidHistory } from './api';

export const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));

export const bigintToBigNumber = (value: bigint, decimals: bigint): BigNumber =>
	new BigNumber(value.toString()).div(10 ** Number(decimals));

export const updateBidListStore = async (gnarId: bigint) => {
	const history = await getBidHistory(gnarId);
	const bidhistories = history.map((child: any, index: number) => {
		const bidInfo = {
			gnarId: child.gnarId,
			sender: child.sender,
			value: bigintToBigNumber(BigInt(child.amount.toString()), 18n).toString(),
			transactionHash: child.transactionHash,
			timestamp: child.timestamp,
		};
		return bidInfo;
	});
	bidListStore.setState({
		bidList: bidhistories,
	});
};

export const ethToString = (amount: bigint): string => {
	let value = new BigNumber(amount.toString()).div((10n ** 18n).toString()).toFixed(3);
	if (new BigNumber(value).isZero() && amount !== 0n) {
		return new BigNumber(amount.toString()).div((10n ** 18n).toString()).toPrecision(3);
	}

	// Removes trailing zeros after decimal separator
	if (value.includes('.')) {
		while (value.slice(-1) === '0') {
			value = value.slice(0, -1);
		}
		if (value.slice(-1) === '.') {
			value = value.slice(0, -1);
		}
	}

	return value;
};

export const mergeDeep = (obj1: unknown, obj2: unknown): unknown => {
	if (obj1 === undefined && obj2 === undefined) {
		return undefined;
	}
	if (
		obj2 !== undefined &&
		(obj2 === null ||
			typeof obj2 === 'string' ||
			typeof obj2 === 'number' ||
			typeof obj2 === 'boolean' ||
			typeof obj2 === 'bigint' ||
			Array.isArray(obj2))
	) {
		return obj2;
	}
	if (
		obj2 === undefined &&
		obj1 !== undefined &&
		(obj1 === null ||
			typeof obj1 === 'string' ||
			typeof obj1 === 'number' ||
			typeof obj1 === 'boolean' ||
			typeof obj1 === 'bigint' ||
			Array.isArray(obj1))
	) {
		return obj1;
	}
	if (obj1 === undefined || (typeof obj1 !== 'object' && typeof obj2 === 'object')) {
		return mergeDeep({}, obj2);
	}
	if (obj2 === undefined || (typeof obj2 !== 'object' && typeof obj1 === 'object')) {
		return mergeDeep(obj1, {});
	}
	if (obj1 && typeof obj1 === 'object' && typeof obj2 === 'object') {
		const newObj: { [key: string]: unknown } = {};
		for (const key of Object.keys(obj1)) {
			newObj[key] = mergeDeep((obj1 as { [key: string]: unknown })[key], (obj2 as { [key: string]: unknown })[key]);
		}
		for (const key of Object.keys(obj2)) {
			newObj[key] = mergeDeep((obj1 as { [key: string]: unknown })[key], (obj2 as { [key: string]: unknown })[key]);
		}
		return newObj;
	}
	throw new Error('Cannot merge objects');
};

export const parseDate = (dateString: string) => {
	const matches = dateString.match(/([A-Za-z]{3}) ([0-9]{2}) ([0-9]{4}) \/ ([0-9]{2}) : ([0-9]{2})/);
	if (matches) {
		const [, month, day, year, hour, minute] = matches;
		let numbericMonth = '';
		switch (month.toLowerCase()) {
			case 'jan':
				numbericMonth = '01';
				break;
			case 'feb':
				numbericMonth = '02';
				break;
			case 'mar':
				numbericMonth = '03';
				break;
			case 'apr':
				numbericMonth = '04';
				break;
			case 'may':
				numbericMonth = '05';
				break;
			case 'jun':
				numbericMonth = '06';
				break;
			case 'jul':
				numbericMonth = '07';
				break;
			case 'aug':
				numbericMonth = '08';
				break;
			case 'sep':
				numbericMonth = '09';
				break;
			case 'oct':
				numbericMonth = '10';
				break;
			case 'nov':
				numbericMonth = '11';
				break;
			case 'dec':
				numbericMonth = '12';
				break;
			default:
				throw new Error('Cannot parse month');
		}
		return new Date(`${year}-${numbericMonth}-${day}T${hour}:${minute}:00.000Z`);
	} else {
		return new Date(dateString);
	}
};

export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const arrayBufferToString = (buffer: ArrayBuffer) => new TextDecoder().decode(new Uint8Array(buffer));

export const fileNameToTrait = (fileName: string): string => {
	let matches = fileName.toLowerCase().match(/^[a-z]+-(.+)(?:\.png){0,1}$/);
	if (!matches) {
		matches = fileName.toLowerCase().match(/^(.+)(?:\.png){0,1}$/);
	}
	if (matches) {
		let trait = matches[1];
		while (trait.match(/(^|-)[a-z]/)) {
			trait = trait.replace(/(^|-)[a-z]/, (match) => {
				return match.toUpperCase();
			});
		}
		trait = trait.replace('-', ' ');
		trait = trait.replace('-', ' '); // It is not the same character as in the line before.
		return trait;
	}
	throw new Error('Invalid file name');
};
