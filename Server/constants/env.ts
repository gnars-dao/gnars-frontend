require('dotenv').config();

type IEnvProperties =
	| 'REACT_APP_WSS_URL'
	| 'REACT_APP_SKATE_ADDRESS'
	| 'REACT_APP_SKATE_V2_ADDRESS'
	| 'REACT_APP_SKATE_V2_AUCTION_HOUSE_ADDRESS'
	| 'REACT_APP_V2_START_ID'
	| 'PORT'
	| 'MONGO_DB'
	| 'INITIAL_SUBSCRIPTION_BLOCK'
	| 'ENFORCE_VERSION';

const exitWithErrorMessage = (errorMessage: string): never => {
	console.error(errorMessage);
	process.exit(1);
};

const getEnvString = (property: IEnvProperties): string => {
	const value = process.env[property];
	if (value === undefined) {
		return exitWithErrorMessage(`Environment variable ${property} is undefined`);
	}
	return value;
};

const getEnvNumber = (property: IEnvProperties): number => {
	const value = process.env[property];
	if (value === undefined) {
		return exitWithErrorMessage(`Environment variable ${property} is undefined`);
	}
	const numberValue = Number(value);
	if (!Number.isFinite(numberValue)) {
		return exitWithErrorMessage(`Environment variable ${property} is not a number`);
	}
	return numberValue;
};

const getEnvBigInt = (property: IEnvProperties): bigint => {
	const value = process.env[property];
	if (value === undefined) {
		return exitWithErrorMessage(`Environment variable ${property} is undefined`);
	}
	try {
		return BigInt(value);
	} catch {
		return exitWithErrorMessage(`Environment variable ${property} is not a number`);
	}
};

export const WSS_URL = getEnvString('REACT_APP_WSS_URL');
export const SKATE_ADDRESS = getEnvString('REACT_APP_SKATE_ADDRESS');
export const SKATE_V2_ADDRESS = getEnvString('REACT_APP_SKATE_V2_ADDRESS');
export const SKATE_V2_AUCTION_HOUSE_ADDRESS = getEnvString('REACT_APP_SKATE_V2_AUCTION_HOUSE_ADDRESS');
export const V2_START_ID = getEnvBigInt('REACT_APP_V2_START_ID');
export const PORT = getEnvNumber('PORT');
export const MONGO_DB = getEnvString('MONGO_DB');
export const INITIAL_SUBSCRIPTION_BLOCK = getEnvString('INITIAL_SUBSCRIPTION_BLOCK');
export const ENFORCE_VERSION = getEnvNumber('ENFORCE_VERSION');
