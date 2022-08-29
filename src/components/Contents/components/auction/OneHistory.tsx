import Davatar from '@davatar/react';
import { BigNumberish } from '@ethersproject/bignumber';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { buildEtherscanTxLink } from '../../../../utils/funcs';
import { ShortAddress } from '../../../utils/ShortAddress';

interface IOneHistoryProps {
	address: string;
	bidDate?: BigInt;
	bidAmount?: BigNumberish;
	transactionHash: string;
	showDate?: boolean;
}

export const OneHistory: FC<IOneHistoryProps> = ({
	address,
	bidDate = 0n,
	bidAmount = 0,
	transactionHash,
	showDate = false,
}) => {
	const { library: provider } = useWeb3React();
	const date = `${dayjs(Number(bidDate) * 1000).format('MMM DD')} at ${dayjs(Number(bidDate) * 1000).format(
		'hh:mm a'
	)}`;

	const txLink = buildEtherscanTxLink(transactionHash);

	return (
		<div className="flex items-center px-3 py-3 text-lg border-b border-secondaryText lg:dark:border-white">
			<div className={`${showDate && 'w-1/2'}`}>
				<div className="flex">
					<Davatar size={24} address={address} provider={provider} />
					{showDate && (
						<div className="pl-2 font-bold">
							<ShortAddress address={address} />
						</div>
					)}
				</div>
				{showDate && <div className="text-gray-400">{date}</div>}
			</div>
			{!showDate && (
				<div className="pl-2 font-bold">
					<ShortAddress address={address} />
				</div>
			)}
			<div className="flex items-center justify-end w-full">
				<div>Ξ</div>
				<div className="px-4">{new BigNumber(bidAmount.toString()).toFixed(3)}</div>
				<a href={txLink} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faExternalLinkAlt} />
				</a>
			</div>
		</div>
	);
};
