import React, { FC } from 'react';
import braveLogo from '../../../../../assets/images/wallets/brave.svg';
import coinbaseWalletLogo from '../../../../../assets/images/wallets/coinbase-wallet-dot.svg';
import fortmaticLogo from '../../../../../assets/images/wallets/fortmatic.svg';
import ledgerLogo from '../../../../../assets/images/wallets/ledger.svg';
import metamaskLogo from '../../../../../assets/images/wallets/metamask-fox.svg';
import trezorLogo from '../../../../../assets/images/wallets/trezor.svg';
import walletconnectLogo from '../../../../../assets/images/wallets/walletconnect-logo.svg';
import classes from './walletButton.module.css';

export enum WALLET_TYPE {
	metamask = 'Metamask',
	brave = 'Brave',
	ledger = 'Ledger',
	walletconnect = 'WalletConnect',
	fortmatic = 'Fortmatic',
	trezor = 'Trezor',
	coinbaseWallet = 'Coinbase Wallet',
}

const logo = (walletType: WALLET_TYPE) => {
	switch (walletType) {
		case WALLET_TYPE.metamask:
			return metamaskLogo;
		case WALLET_TYPE.fortmatic:
			return fortmaticLogo;
		case WALLET_TYPE.walletconnect:
			return walletconnectLogo;
		case WALLET_TYPE.brave:
			return braveLogo;
		case WALLET_TYPE.ledger:
			return ledgerLogo;
		case WALLET_TYPE.trezor:
			return trezorLogo;
		case WALLET_TYPE.coinbaseWallet:
			return coinbaseWalletLogo;
		default:
			return '';
	}
};

interface IWalletButtonProps {
	onClick: () => void;
	walletType: WALLET_TYPE;
}

export const WalletButton: FC<IWalletButtonProps> = ({ onClick, walletType }) => (
	<button className={classes.walletButton} onClick={onClick}>
		<img src={logo(walletType)} alt={`${walletType} logo`} />
		{walletType}
	</button>
);
