import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { RPC_URL } from '../../constants/env';

const ensAddressCache: {
	[ethAddress: string]: string;
} = {};

export const useReverseENSLookUp = (address: string): string | undefined => {
	const [ensAddress, setEnsAddress] = useState<string | undefined>();

	useEffect(() => {
		if (ensAddressCache[address]) {
			setEnsAddress(ensAddressCache[address]);
		} else {
			setEnsAddress(undefined);
			(async () => {
				try {
					const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
					const tmpEnsAddress = await provider.lookupAddress(address);
					if (tmpEnsAddress) {
						ensAddressCache[address] = tmpEnsAddress;
					}
					setEnsAddress(tmpEnsAddress ?? undefined);
				} catch (e) {}
			})();
		}
	}, [address]);

	return ensAddress;
};
