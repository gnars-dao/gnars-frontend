import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FC } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { useStore } from 'react-stores';
import { TREASURY_ADDRESS, V2_START_ID } from '../../../../constants/env';
import { bidListStore, displayGnarIdStore } from '../../../../store';
import { IRootState } from '../../../../store/store';
import { Bid } from '../../../../utils/CommonTypes';
import { TrancatedAmount } from '../../../../utils/funcs';
import { ShortAddress } from '../../../utils/ShortAddress';
import { useAuctionTimeLeft } from '../../../utils/useAuctionTimeLeft';

dayjs.extend(duration);

interface ITimeCounterProps {
	winner?: { amount: string; address: string };
}

export const TimeCounter: FC<ITimeCounterProps> = ({ winner }) => {
	const { currentGnarId, remainBlocks, isPaused } = useSelector((state: IRootState) => state.auction);
	const { bidList } = useStore(bidListStore);
	const { display_gnarId } = useStore(displayGnarIdStore);
	const auctionTimeLeft = useAuctionTimeLeft();

	const latestBid: Bid | null = bidList.length > 0 ? bidList[0] : null;

	// Ξ
	return (
		<div className="flex flex-col lg:flex-row">
			<div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:border-r lg:border-secondaryText lg:dark:border-white lg:pr-14">
				<div className="text-lg text-secondaryText lg:dark:text-white font-bold whitespace-nowrap">
					{display_gnarId === currentGnarId && auctionTimeLeft !== 'Waiting' ? 'Current bid' : 'Winning bid'}
				</div>
				<div className="text-32px font-bold pt-1 whitespace-nowrap">
					{/* Ξ{' '} */}
					{display_gnarId === currentGnarId
						? latestBid
							? 'Ξ ' + TrancatedAmount(latestBid.value.toString())
							: 'Ξ 0'
						: winner && winner.amount === 'n/a'
						? winner.amount
						: winner && winner.amount && Number(winner.amount) !== 0
						? 'Ξ ' + TrancatedAmount(winner.amount)
						: 'Ξ 0'}
				</div>
			</div>
			<div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:pl-14">
				<div className="text-lg text-secondaryText lg:dark:text-white font-bold">
					{display_gnarId === currentGnarId && !isPaused && auctionTimeLeft !== 'Waiting'
						? 'Auction ends in'
						: 'Winner'}
				</div>
				<div className="text-4xl font-bold pt-1 text-right lg:text-left">
					{
						<span className="text-32px">
							{display_gnarId === currentGnarId ? (
								(currentGnarId < V2_START_ID && remainBlocks === 'Waiting') ||
								(currentGnarId >= V2_START_ID && auctionTimeLeft === 'Waiting') ? (
									winner && winner.address && Number(winner.address) !== 0 ? (
										<div className="flex flex-row gap-3">
											<Jazzicon diameter={40} seed={jsNumberForAddress(winner.address)} />
											<ShortAddress address={winner.address} />
										</div>
									) : latestBid !== null ? (
										<div className="flex flex-row gap-3">
											<Jazzicon diameter={40} seed={jsNumberForAddress(latestBid.sender)} />
											<ShortAddress address={latestBid.sender} />
										</div>
									) : (
										'No Winner'
									)
								) : currentGnarId < V2_START_ID ? (
									remainBlocks + ' Blocks'
								) : (
									auctionTimeLeft
								)
							) : winner &&
							  winner.address &&
							  Number.isFinite(Number(winner.address)) &&
							  Number(winner.address) !== 0 ? (
								<div className="flex flex-row gap-3">
									<Jazzicon diameter={40} seed={jsNumberForAddress(winner.address)} />
									<ShortAddress address={winner.address} />
								</div>
							) : winner && winner.address && Number(winner.address) !== 0 ? (
								<div className="flex flex-row gap-3">
									<Jazzicon diameter={40} seed={jsNumberForAddress(TREASURY_ADDRESS)} />
									{winner.address}
								</div>
							) : (
								'No Winner'
							)}
						</span>
					}
				</div>
			</div>
		</div>
	);
};
