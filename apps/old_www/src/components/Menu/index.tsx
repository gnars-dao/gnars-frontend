import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import Svg from 'react-inlinesvg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import hamburgerIcon from '../../assets/images/bars-solid.svg';
import gnarLogoBlack from '../../assets/images/logo-dark.png';
import gnarLogoHand from '../../assets/images/logo-hand.png';
import gnarLogoWhite from '../../assets/images/logo-white.png';
import { RPC_URL, TREASURY_ADDRESS } from '../../constants/env';
import { IRootState } from '../../store/store';
import { ethToString } from '../../utils/utils';
import { BaseButton } from '../utils/baseButton/baseButton';
import { IconButton } from '../utils/iconButton/iconButton';
import { ConnectButton } from './connectButton/connectButton';

interface IMenuProps {
	enforceDarkLogo?: boolean;
}

export const Menu: FC<IMenuProps> = ({ enforceDarkLogo }) => {
	const { isDarkBackground } = useSelector((state: IRootState) => state.style);
	const [treasury, setTreasury] = useState('');
	const [showMenu, setShowMenu] = useState(false);
	const { currentGnarId } = useSelector((state: IRootState) => state.auction);

	useEffect(() => {
		(async () => {
			const web3 = new Web3(RPC_URL);
			const balance = await web3.eth.getBalance(TREASURY_ADDRESS);
			setTreasury(ethToString(BigInt(balance)));
		})();
	});

	return (
		<div className="flex flex-col lg:flex-row justify-between w-full gap-6 pt-4 lg:pt-12 px-4 lg:max-w-1116px">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-6">
					<Link className="flex" to="/" reloadDocument>
						<img
							className="hidden sm:flex max-h-40px min-w-190px"
							src={enforceDarkLogo || !isDarkBackground ? gnarLogoBlack : gnarLogoWhite}
						/>
						<img className="flex sm:hidden max-h-40px" src={gnarLogoHand} />
					</Link>
					<a href={`https://etherscan.io/address/${TREASURY_ADDRESS}`} target="_blank" rel="noopener noreferrer">
						<BaseButton className="gap-3 hover:bg-hoverLight font-bold w-full lg:w-auto border border-borderColor">
							<div className="text-secondaryText dark:text-white">Treasury</div>
							<div className="whitespace-nowrap dark:text-white">Ξ {treasury}</div>
						</BaseButton>
					</a>
				</div>
				<BaseButton className="flex lg:hidden" onClick={() => setShowMenu(!showMenu)}>
					<Svg className="dark:text-white" src={hamburgerIcon} width={24} />
				</BaseButton>
			</div>
			<div
				className={clsx(
					showMenu ? 'flex' : 'hidden',
					'lg:flex flex-col lg:flex-row lg:justify-end w-full text-lg gap-3'
				)}
			>
				<div className="flex flex-col lg:flex-row gap-3">
					<a href="https://snapshot.org/#/gnars.eth" target="_blank" rel="noopener noreferrer">
						<IconButton design="transparent" icon="people" text="DAO" />
					</a>
					<a href="https://gnars.com" target="_blank" rel="noopener noreferrer">
						<IconButton design="transparent" icon="book" text="About" />
					</a>
					<Link to="/playground">
						<IconButton design="transparent" icon="play" text="Playground" />
					</Link>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};
