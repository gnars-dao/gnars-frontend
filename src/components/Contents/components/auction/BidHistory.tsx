import React, { FC } from 'react';
import { useStore } from 'react-stores';
import { bidListStore } from '../../../../store';
import { Bid } from '../../../../utils/CommonTypes';
import { sortWithAmount } from '../../../../utils/funcs';
import { OneHistory } from './OneHistory';

export const BidHistory: FC = () => {
	// match store values
	const { bidList }: { bidList: Array<Bid> } = useStore(bidListStore);

	return (
		<div className="pt-2 lg:max-w-565px">
			{sortWithAmount(bidList)
				.slice(0, 3)
				.map((bid: Bid, index: number) => {
					return (
						<div className="pb-2 pr-0" key={index}>
							<OneHistory
								address={bid.sender}
								bidDate={BigInt(bid.timestamp.toString())}
								bidAmount={bid.value}
								transactionHash={bid.transactionHash}
							/>
						</div>
					);
				})}
		</div>
	);
};
