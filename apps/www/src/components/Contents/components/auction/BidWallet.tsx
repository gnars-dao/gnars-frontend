import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Svg from 'react-inlinesvg';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { useSelector } from 'react-redux';
import { useStore } from 'react-stores';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import infoIcon from '../../../../assets/images/info.svg';
import { CHAIN_ID, V2_START_ID } from '../../../../constants/env';
import { web3Store } from '../../../../store';
import { IRootState } from '../../../../store/store';
import { ethToString } from '../../../../utils/utils';
import { BaseModal } from '../../../Modals/components/baseModal/baseModal';
import { BaseModal2 } from '../../../Modals/components/baseModal2/baseModal2';
import { BaseButton } from '../../../utils/baseButton/baseButton';
import { useAuctionTimeLeft } from '../../../utils/useAuctionTimeLeft';
import { useEtherBalance } from '../../../utils/useEtherBalance';

const BidInput = styled.input`
	/* Firefox */
	-moz-appearance: textfield;
	-webkit-appearance: textfield;

	/* Chrome, Safari, Edge, Opera */
	&:-webkit-outer-spin-button,
	&:-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	border-radius: 12px;
	height: 54px;

	::placeholder {
		opacity: 0.3;
	}
`;

const StyledButton = styled.button`
	background-color: rgb(55, 65, 81);
	border-radius: 12px;
	height: 54px;

	&:hover {
		background-color: rgb(128, 128, 128);
	}

	&:disabled {
		cursor: not-allowed;
		color: #d5d7e1;
		background-color: rgb(128, 128, 128);
	}
`;

export const BidWallet: FC = () => {
	const { addToast } = useToasts();

	const { currentGnarId, isPaused, remainBlocks, minimumBid, auctionEndTimestamp } = useSelector(
		(state: IRootState) => state.auction
	);
	const { skateContract, v2AuctionHouse, skateSettleContract } = useStore(web3Store);

	const [currentBid, setCurrentBid] = useState<string>('');
	const [sliderVal, setSliderVal] = useState(50);
	const [showInsufficientModal, setShowInsufficientModal] = useState(false);
	const { chainId, account } = useWeb3React();
	const etherBalance = useEtherBalance(account);
	const auctionTimeLeft = useAuctionTimeLeft();
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [render, setRender] = useState(Math.random());

	const handleBid = useCallback(() => {
		if (!account) {
			addToast('Please connect your wallet', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (currentGnarId < 0n) {
			addToast('Please wait when loading', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (currentGnarId < V2_START_ID && (typeof remainBlocks === 'string' || remainBlocks < 2n)) {
			addToast('Calculating, Please wait!!!', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (chainId !== CHAIN_ID) {
			addToast('Please switch your network to Ethereum', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (
			!new BigNumber(currentBid).isFinite() ||
			BigInt(
				new BigNumber(currentBid)
					.times(10 ** 18)
					.integerValue()
					.toString()
			) < minimumBid
		) {
			setShowInsufficientModal(true);
			return;
		}

		const currentBidInWei = BigInt(
			new BigNumber(currentBid)
				.times(10 ** 18)
				.integerValue()
				.toString()
		);

		if (etherBalance !== undefined && etherBalance < currentBidInWei) {
			addToast("You don't have enough balance in your wallet", {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (currentGnarId < V2_START_ID) {
			skateContract.methods
				.createBid(currentGnarId, sliderVal, 100 - sliderVal)
				.send({
					from: account,
					value: currentBidInWei.toString(),
				})
				.on('error', (error: Error) => {
					console.log(error);
					addToast('Failed to bid', {
						appearance: 'error',
						autoDismiss: true,
					});
				});
		} else {
			v2AuctionHouse.methods
				.createBid(currentGnarId, sliderVal, 100 - sliderVal)
				.send({
					from: account,
					value: currentBidInWei.toString(),
				})
				.on('error', (error: Error) => {
					console.log(error);
					addToast('Failed to bid', {
						appearance: 'error',
						autoDismiss: true,
					});
				});
		}
	}, [
		addToast,
		account,
		currentGnarId,
		remainBlocks,
		chainId,
		setShowInsufficientModal,
		currentBid,
		minimumBid,
		etherBalance,
		skateContract,
		v2AuctionHouse,
		sliderVal,
	]);

	const handleSettleAuction = () => {
		if (!account) {
			addToast('Please connect your wallet', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (currentGnarId < 0n) {
			addToast('Please wait when loading', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (chainId !== CHAIN_ID) {
			addToast('Please switch your network to Ethereum', {
				appearance: 'error',
				autoDismiss: true,
			});
			return;
		}

		if (currentGnarId < V2_START_ID) {
			skateSettleContract.methods
				.settleAuction()
				.send({
					from: account,
				})
				.on('error', (err: Error) => {
					console.log(err);
					addToast('Failed to settle auction', {
						appearance: 'error',
						autoDismiss: true,
					});
				});
		} else {
			v2AuctionHouse.methods
				.settleCurrentAndCreateNewAuction()
				.send({ from: account })
				.on('error', (err: Error) => {
					console.log(err);
					addToast('Failed to settle auction', {
						appearance: 'error',
						autoDismiss: true,
					});
				});
		}
	};

	const dismissInsufficientModal = () => {
		setShowInsufficientModal(false);
	};

	const onChangeBidValue = (value: string) => {
		setCurrentBid(value);
	};

	const onChangeSliderValue = (value: number) => {
		setSliderVal(100 - value);
	};

	const handleInfo = useCallback(() => {
		setShowInfoModal(!showInfoModal);
	}, [showInfoModal]);

	useEffect(() => {
		if (
			!isPaused &&
			currentGnarId >= V2_START_ID &&
			auctionTimeLeft === 'Waiting' &&
			typeof auctionEndTimestamp === 'bigint' &&
			auctionEndTimestamp + 60n * 2n > BigInt(Date.now()) / 1000n
		) {
			const interval = setInterval(() => {
				setRender(Math.random());
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isPaused, currentGnarId, auctionTimeLeft, auctionEndTimestamp]);

	return (
		<div>
			{isPaused ? (
				<div className="text-3xl font-bold">Auction is paused</div>
			) : (currentGnarId < V2_START_ID && (remainBlocks === 'Waiting' || remainBlocks === 'Loading')) ||
			  (currentGnarId >= V2_START_ID && (auctionTimeLeft === 'Waiting' || auctionTimeLeft === 'Loading')) ? (
				<>
					{(currentGnarId < V2_START_ID && remainBlocks === 'Waiting') ||
					(currentGnarId >= V2_START_ID && auctionTimeLeft === 'Waiting') ? (
						<div className="lg:max-w-565px">
							{/* <div className="text-3xl font-bold">Are you the winner?</div>
							<div className="text-xl my-3 text-tertiaryText dark:text-white">
								Settle auction to claim the Gnar you&acute;ve won
							</div> */}
							{currentGnarId >= V2_START_ID &&
							typeof auctionEndTimestamp === 'bigint' &&
							auctionEndTimestamp + 60n * 2n > BigInt(Date.now()) / 1000n ? (
								<StyledButton
									className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded h-12 w-full text-xl mt-3"
									disabled
								>
									{BigInt(Date.now()) / 1000n - auctionEndTimestamp < 60n
										? 'You can settle auction in 2 minutes'
										: `You can settle auction in ${
												auctionEndTimestamp + 60n * 2n - BigInt(Date.now()) / 1000n
										  } seconds`}

									{/* {`You can settle auction in ${auctionEndTimestamp + 60n * 2n - BigInt(Date.now()) / 1000n} seconds`} */}
								</StyledButton>
							) : (
								<StyledButton
									className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded h-12 w-full text-xl mt-3"
									onClick={handleSettleAuction}
								>
									Settle Auction
								</StyledButton>
							)}
							{/* <div className="text-xl my-3 text-tertiaryText dark:text-white">
								Not the winner but feeling gnarly? You can still settle the auction to kick off the next
							</div> */}
						</div>
					) : null}
				</>
			) : (
				<>
					{/* <div className="pt-4 pb-2">
						<span className="pr-2">
							<i className="fas fa-info-circle text-tertiaryText dark:text-white"></i>
						</span>
						<HashLink
							className="text-16px underline cursor-pointer  text-tertiaryText dark:text-white hover:text-primaryText no-underline"
							to="#wtf"
						>
							Remember to settle auction if you win
						</HashLink>
					</div> */}
					<div className="flex items-center gap-3 sm:gap-3 max-w-md">
						<div className="text-2xl text-secondaryText lg:dark:text-white whitespace-nowrap">Founder</div>
						<Slider
							value={100 - sliderVal}
							min={0}
							max={100}
							step={1}
							onChange={(val) => {
								onChangeSliderValue(val);
							}}
							className="flex-1"
							tooltip={false}
						/>
						<div className="text-2xl text-secondaryText lg:dark:text-white whitespace-nowrap">Treasury</div>
					</div>
					<div className="flex flex-row md:flex items-center gap-2 sm:gap-2 lg:max-w-565px">
						<BidInput
							id="bidInput"
							className="flex-1 rounded px-2 border focus:outline-none focus:border-current text-25px min-w-0 text-primaryText"
							type="text"
							value={currentBid}
							onChange={(event) => setCurrentBid(event.currentTarget.value)}
							placeholder={`Ξ ${ethToString(minimumBid)} or more`}
						/>
						<StyledButton
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 h-12 text-lg mt-2-md whitespace-nowrap"
							onClick={handleBid}
						>
							Place Bid
						</StyledButton>
					</div>
					{showInsufficientModal && (
						<BaseModal
							title="Insufficient bid amount 🤏"
							transparent={false}
							closeButton={false}
							content={
								<div className="pt-3 pb-6">
									Please place a bid higher than the minimum bid amount of Ξ {ethToString(minimumBid)}.
								</div>
							}
							onDismiss={dismissInsufficientModal}
						/>
					)}
				</>
			)}
			<BaseButton className="flex gap-1 items-center mt-2 hover:text-secondaryText" noPadding onClick={handleInfo}>
				<Svg src={infoIcon} height={16} width={16} />
				<div>bidding and settling</div>
			</BaseButton>
			{showInfoModal && (
				<BaseModal2 blur closeButton onClose={() => setShowInfoModal(false)}>
					<div className="flex max-w-2xl rounded-3xl p-8 bg-modalBackground">
						<div className="flex flex-col bg-primaryBackground rounded-xl overflow-y-scroll p-3 gap-y-8">
							<div className="flex flex-col">
								<div className="font-secondary text-24px text-bidsFor">Info</div>
								<div className="font-secondary text-42px leading-10">Bidding and Settling</div>
							</div>
							<div className="flex flex-col">
								<div className="text-20px font-bold">Settlement</div>
								<div className="font-bold">
									Anyone can settle an auction. When an auction ends, a gas-only transaction is required to start the
									next auction and mint the current Gnar to the winner’s wallet. As gas prices fluctuate, the cost of
									settlement also fluctuates.
								</div>
							</div>
							<div className="font-bold">
								Cost of settlement for every Gnar ID ending in 6 is higher as it consumes more gas. This is due to the
								transaction also triggering the free Gnar mint: all Gnars ending in 7 are sent to the treasury and held
								on behalf of the Nouns Athletes.
							</div>
							<div className="flex flex-col">
								<div className="text-20px font-bold">Bids</div>
								<div className="font-bold">
									Once an auction starts, everyone has 10 minutes to bid (auction duration doubles every 1000 auctions
									from #627 onwards). Anyone can bid an amount at/above 0.011 ETH. If your bid is outbid by someone
									else, the full amount of your bid (minus gas spent to bid) is returned to you in the same transaction
									as the new higher bid.
								</div>
							</div>
							<div className="font-bold">
								Bids at the very last minute DO NOT increase the auction time. Instead, you have the opportunity to
								snipe the auction with a winning bid during the final moments. Sometimes, multiple bids are sent at the
								same time, but only one will be accepted by the auction house contract.
							</div>
							<div className="flex flex-col">
								<div className="text-20px font-bold">Bid Refunds</div>
								<div className="font-bold">
									Unsuccessful bids are refunded in full. Refunds are sent via an internal transaction included in the
									transaction of a new higher bid. This means that refunds for unsuccessful bids occur when a higher bid
									is received.
								</div>
							</div>
						</div>
					</div>
				</BaseModal2>
			)}
		</div>
	);
};
