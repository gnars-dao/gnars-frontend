import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';

export const useAuctionTimeLeft = (): string => {
	const { auctionEndTimestamp } = useSelector((state: IRootState) => state.auction);
	const [auctionTimeLeft, setAuctionTimeLeft] = useState('Loading');

	useEffect(() => {
		const interval = setInterval(() => {
			let newAuctionTimeLeft = 'Loading';
			try {
				if (typeof auctionEndTimestamp === 'bigint') {
					newAuctionTimeLeft = 'Waiting';
					const now = BigInt(Date.now()) / 1000n;
					let difference = auctionEndTimestamp - now;
					if (difference > 0) {
						const hours = difference / (60n * 60n);
						difference -= hours * (60n * 60n);
						const minutes = difference / 60n;
						const seconds = difference - minutes * 60n;
						newAuctionTimeLeft = '';
						if (hours > 0) {
							newAuctionTimeLeft = `${hours}h `;
						}
						if (hours > 0 || minutes > 0) {
							newAuctionTimeLeft = `${minutes}m `;
						}
						newAuctionTimeLeft += `${seconds}s`;
					}
				}
			} finally {
				setAuctionTimeLeft(newAuctionTimeLeft);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [auctionEndTimestamp]);

	return auctionTimeLeft;
};
