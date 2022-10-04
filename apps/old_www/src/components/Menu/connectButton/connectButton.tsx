import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { FC, useCallback, useEffect, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useDispatch, useSelector } from 'react-redux';
import { CHAIN_ID } from '../../../constants/env';
import { updateReconnectInjected } from '../../../store/ethereum/actions';
import { IRootState } from '../../../store/store';
import { ConnectModal } from '../../Modals/connectModal/connectModal';
import { BaseButton } from '../../utils/baseButton/baseButton';
import { ShortAddress } from '../../utils/ShortAddress';

export const ConnectButton: FC = () => {
	const { active, account, deactivate, activate } = useWeb3React();
	const [showConnectModal, setShowConnectModal] = useState(false);
	const { reconnectInjected } = useSelector((state: IRootState) => state.ethereum);
	const dispach = useDispatch();

	useEffect(() => {
		(async () => {
			if (!active && reconnectInjected) {
				const injected = new InjectedConnector({
					supportedChainIds: [CHAIN_ID],
				});
				try {
					await activate(injected);
				} catch (e) {
					dispach(updateReconnectInjected(false));
				}
			}
		})();
	}, [dispach, active, activate, reconnectInjected]);

	useEffect(() => {
		if (active) {
			setShowConnectModal(false);
		}
	}, [active]);

	const handleClick = useCallback(() => {
		if (active) {
			dispach(updateReconnectInjected(false));
			deactivate();
		} else {
			setShowConnectModal(true);
		}
	}, [active, deactivate, dispach]);

	return (
		<>
			<BaseButton className="text-primaryText bg-primary hover:bg-hoverLight font-bold" onClick={handleClick}>
				{active && account ? (
					<div className="flex items-center gap-3 ">
						<Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
						<ShortAddress address={account} />
					</div>
				) : (
					'Connect'
				)}
			</BaseButton>
			{showConnectModal && <ConnectModal onDismiss={() => setShowConnectModal(false)} />}
		</>
	);
};
