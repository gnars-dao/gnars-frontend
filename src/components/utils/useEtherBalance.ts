import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

export const useEtherBalance = (account: string | null | undefined): bigint | undefined => {
	const [balance, setBalance] = useState<bigint | undefined>(undefined);
	const [update, setUpdate] = useState(Math.random());
	const { chainId, library } = useWeb3React();

	useEffect(() => {
		(async () => {
			let newBalance: string | undefined;
			try {
				if (account && library) {
					const web3 = new Web3(library);
					try {
						const newBalance = await web3.eth.getBalance(account);
						setBalance(BigInt(newBalance));
					} catch (e) {}
					setTimeout(() => setUpdate(Math.random()), 1000 * 10);
				}
			} finally {
				if (newBalance) {
					setBalance(BigInt(newBalance));
				} else {
					setBalance(undefined);
				}
			}
		})();
	}, [chainId, account, library, update]);

	return balance;
};
