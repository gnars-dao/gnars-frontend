type IEnvProperties =
	| 'BACKEND_URL'
	| 'BACKEND_WSS_URL'
	| 'BASENAME'
	| 'CHAIN_ID'
	| 'ETHERSCAN_API_KEY'
	| 'RPC_URL'
	| 'SKATE_ADDRESS'
	| 'SKATE_SETTLE_ADDRESS'
	| 'SKATE_V2_ADDRESS'
	| 'SKATE_V2_AUCTION_HOUSE_ADDRESS'
	| 'TREASURY_ADDRESS'
	| 'V2_START_ID'
	| 'WSS_URL';

const getEnvString = (property: IEnvProperties, allowUndefined = false): string => {
	const value = process.env[`REACT_APP_${property}`];
	if (!allowUndefined && value === undefined) {
		throw new Error(`Environment variable ${property} is undefined`);
	}
	return value ?? '';
};

const getEnvNumber = (property: IEnvProperties): number => {
	const value = process.env[`REACT_APP_${property}`];
	if (value === undefined) {
		throw new Error(`Environment variable ${property} is undefined`);
	}
	const numberValue = Number(value);
	if (!Number.isFinite(numberValue)) {
		throw new Error(`Environment variable ${property} is not a number`);
	}
	return numberValue;
};

const getEnvBigInt = (property: IEnvProperties): bigint => {
	const value = process.env[`REACT_APP_${property}`];
	if (value === undefined) {
		throw new Error(`Environment variable ${property} is undefined`);
	}
	try {
		return BigInt(value);
	} catch {
		throw new Error(`Environment variable ${property} is not a number`);
	}
};

export const BACKEND_URL = getEnvString('BACKEND_URL');
export const BACKEND_WSS_URL = getEnvString('BACKEND_WSS_URL');
export const BASENAME = getEnvString('BASENAME', true);
export const CHAIN_ID = getEnvNumber('CHAIN_ID');
export const ETHERSCAN_API_KEY = getEnvString('ETHERSCAN_API_KEY', true);
export const RPC_URL = getEnvString('RPC_URL');
export const SKATE_ADDRESS = getEnvString('SKATE_ADDRESS');
export const SKATE_SETTLE_ADDRESS = getEnvString('SKATE_SETTLE_ADDRESS');
export const SKATE_V2_ADDRESS = getEnvString('SKATE_V2_ADDRESS');
export const SKATE_V2_AUCTION_HOUSE_ADDRESS = getEnvString('SKATE_V2_AUCTION_HOUSE_ADDRESS');
export const TREASURY_ADDRESS = getEnvString('TREASURY_ADDRESS');
export const V2_START_ID = getEnvBigInt('V2_START_ID');
export const WSS_URL = getEnvString('WSS_URL');
