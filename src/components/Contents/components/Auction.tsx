import clsx from 'clsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BigNumber } from 'ethers';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStore } from 'react-stores';
import { V2_START_ID } from '../../../constants/env';
import { displayGnarIdStore, web3Store } from '../../../store';
import { IRootState } from '../../../store/store';
import { getWinner } from '../../../utils/api';
import { updateBidListStore } from '../../../utils/utils';
import { BidHistory } from './auction/BidHistory';
import { BidPast } from './auction/BidPast';
import { BidWallet } from './auction/BidWallet';
import { TimeCounter } from './auction/TimeCounter';

dayjs.extend(utc);

interface IRoundButtonProps {
	className?: string;
}

const RoundButton: FC<IRoundButtonProps> = ({ children, className }) => {
	return (
		<button
			className={clsx(
				'font-Shadeerah text-lg text-primaryText bg-primary hover:bg-hoverLight font-bold rounded-full w-32px h-32px text-center align-baseline',
				className
			)}
		>
			{children}
		</button>
	);
};

export const Auction: FC = () => {
	// const currentTime = dayjs()
	// 	.utc()
	// 	.format('MMM DD YYYY / HH : mm');

	const { currentGnarId } = useSelector((state: IRootState) => state.auction);
	const { display_gnarId } = useStore(displayGnarIdStore);
	const { web3Ins } = useStore(web3Store);

	const [prevGnarStatus, setPrevGnarStatus] = useState(false);
	const [nextGnarStatus, setNextGnarStatus] = useState(false);

	// const [gnarCreatedTime, setGnarCreatedTime] = useState(null);
	const [winnerInfo, setWinnerInfo] = useState<{ amount: string; address: string } | undefined>();

	const convertEther = useCallback(
		(amount: BigNumber) => {
			return web3Ins.utils.fromWei(amount.toString(), 'ether');
		},
		[web3Ins]
	);

	const updateWinner = useCallback(
		async (gnarId: bigint) => {
			const winner = await getWinner(gnarId);
			if (winner.length > 0) {
				const winInfo = {
					amount: convertEther(winner[winner.length - 1].amount),
					address: winner[winner.length - 1].winner,
				};
				setWinnerInfo(winInfo);
			} else if (display_gnarId - V2_START_ID >= 0n && (display_gnarId - V2_START_ID) % 10n === 0n) {
				setWinnerInfo({
					amount: 'n/a',
					address: '0x0658f4eD17289144717713ADfFC2539eF7c2EF8e',
				});
			} else {
				setWinnerInfo(undefined);
			}
		},
		[convertEther, display_gnarId]
	);

	useEffect(() => {
		if (display_gnarId < 0 || currentGnarId < 0n) {
			setPrevGnarStatus(false);
			setNextGnarStatus(false);
			return;
		}
		if (Number(display_gnarId) === 0) {
			setPrevGnarStatus(false);
		} else {
			setPrevGnarStatus(true);
		}

		if (display_gnarId === currentGnarId) {
			setNextGnarStatus(false);
		} else {
			setNextGnarStatus(true);
		}
		// onGetDisplayBidHistories();
		updateBidListStore(display_gnarId);
		updateWinner(display_gnarId);
	}, [display_gnarId, currentGnarId, updateWinner]);

	return (
		<div className="w-full lg:dark:text-white px-4 sm:px-10 lg:px-0 lg:max-w-450px">
			{/* <div className='font-Shadeerah text-2xl'>
				{ gnarCreatedTime ? 
					 gnarCreatedTime 
					 : 
					 (Number(display_gnarId) === Number(currentGnarId) ? currentTime : null)
				}
			</div> */}
			<div className="flex flex-col gap-3" style={{ paddingTop: '15%' }}>
				<div className="flex">
					<div>
						{prevGnarStatus ? (
							<Link to={`/gnar/${display_gnarId - 1n}`}>
								<RoundButton>←</RoundButton>
							</Link>
						) : (
							<RoundButton className="opacity-50">←</RoundButton>
						)}
					</div>
					<div className="ml-1">
						{nextGnarStatus ? (
							<Link to={`/gnar/${display_gnarId + 1n}`}>
								<RoundButton>→</RoundButton>
							</Link>
						) : (
							<RoundButton className="opacity-50">→</RoundButton>
						)}
					</div>
				</div>
				<div className="font-secondary text-5xl sm:text-7xl">
					Gnar {display_gnarId >= 0n && display_gnarId.toString()}
				</div>
			</div>
			<div className="pt-6">
				<TimeCounter winner={winnerInfo} />
			</div>
			{display_gnarId === currentGnarId ? (
				<div>
					<BidWallet />
				</div>
			) : display_gnarId - V2_START_ID >= 0n && (display_gnarId - V2_START_ID) % 10n === 0n ? (
				<div className="text-16px mt-10 pb-4 border-b border-secondaryText lg:dark:border-white">
					To pay homage and show our respect as a Nouns extension, every 10th Gnar for the first 5 years of the project
					is sent to the Nouns Athletes.
				</div>
			) : null}
			<div>{display_gnarId === currentGnarId ? <BidHistory /> : <BidPast />}</div>
		</div>
	);
};
