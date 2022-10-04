import { useWeb3React } from '@web3-react/core';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CHAIN_ID, RPC_URL } from '../../../constants/env';
import { updateReconnectInjected } from '../../../store/ethereum/actions';
import { BaseModal } from '../components/baseModal/baseModal';
import { WalletButton, WALLET_TYPE } from './components/walletButton/walletButton';
import classes from './connectModal.module.css';

interface IConnectModalProps {
	onDismiss: () => void;
}

export const ConnectModal: FC<IConnectModalProps> = ({ onDismiss }) => {
	const { activate } = useWeb3React();
	const supportedChainIds = [CHAIN_ID];
	const dispach = useDispatch();

	const wallets = (
		<div className={clsx(classes.walletConnectModal, 'py-8')}>
			<div className={classes.row}>
				<WalletButton
					onClick={async () => {
						const injected = new InjectedConnector({
							supportedChainIds,
						});
						await activate(injected);
						dispach(updateReconnectInjected(true));
					}}
					walletType={WALLET_TYPE.metamask}
				/>
				<WalletButton
					onClick={() => {
						const fortmatic = new FortmaticConnector({
							apiKey: 'pk_live_60FAF077265B4CBA',
							chainId: CHAIN_ID,
						});
						activate(fortmatic);
					}}
					walletType={WALLET_TYPE.fortmatic}
				/>
			</div>
			<div className={classes.row}>
				<WalletButton
					onClick={() => {
						localStorage.removeItem('walletconnect');
						localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
						const walletlink = new WalletConnectConnector({
							supportedChainIds,
							chainId: CHAIN_ID,
							rpc: {
								[CHAIN_ID.toString()]: RPC_URL,
							},
						});
						activate(walletlink);
					}}
					walletType={WALLET_TYPE.walletconnect}
				/>
				<WalletButton
					onClick={() => {
						const walletlink = new WalletLinkConnector({
							appName: 'Nouns.WTF',
							appLogoUrl: 'https://nouns.wtf/static/media/logo.cdea1650.svg',
							url: RPC_URL,
							supportedChainIds,
						});
						activate(walletlink);
					}}
					walletType={WALLET_TYPE.coinbaseWallet}
				/>
			</div>
			<div className={classes.row}>
				<WalletButton
					onClick={async () => {
						const injected = new InjectedConnector({
							supportedChainIds,
						});
						await activate(injected);
						dispach(updateReconnectInjected(true));
					}}
					walletType={WALLET_TYPE.brave}
				/>
				{/* <WalletButton
        onClick={() => {
          const ledger = new LedgerConnector({
            //TODO: refactor
            chainId: config.supportedChainId,
            url: config.rinkebyJsonRpc,
          });
          activate(ledger);
        }}
        walletType={WALLET_TYPE.ledger}
      /> */}
				<WalletButton
					onClick={() => {
						const trezor = new TrezorConnector({
							chainId: CHAIN_ID,
							url: RPC_URL,
							manifestAppUrl: 'https://nouns.wtf',
							manifestEmail: 'nounops+trezorconnect@protonmail.com',
						});
						activate(trezor);
					}}
					walletType={WALLET_TYPE.trezor}
				/>
			</div>
		</div>
	);
	return (
		<BaseModal
			title="Connect your wallet"
			content={wallets}
			transparent={true}
			closeButton={true}
			onDismiss={onDismiss}
		/>
	);
};
