import { FC, useMemo } from 'react';
import Svg from 'react-inlinesvg';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import linkIcon from '../../../assets/images/arrow-up-right-from-square-solid.svg';
import { ethToString } from '../../../utils/utils';
import { ShortAddress } from '../../utils/ShortAddress';
import { BaseModal } from '../components/baseModal/baseModal';

interface IBidsModalViewProps {
	gnarId: bigint;
	gnarImage: string;
	bids: Array<{ address: string; date: Date; amount: bigint; transactionHash: string }>;
	onClose: () => void;
}

export const BidsModalView: FC<IBidsModalViewProps> = ({ gnarId, gnarImage, bids, onClose }) => {
	const content = useMemo(() => {
		return (
			<div className="flex flex-col gap-3 p-8">
				<div className="flex flex-row gap-3">
					<img className="max-h-96px max-w-96px rounded-2xl" src={gnarImage} />
					<div className="flex flex-col items-start font-secondary ">
						<div className="text-24px text-bidsFor">Bids for</div>
						<div className="text-42px leading-42px">Gnar {gnarId.toString()}</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 bg-primaryBackground p-3 rounded-2xl max-h-180px overflow-y-auto text-18px">
					{bids.map(({ address, date, amount, transactionHash }) => {
						return (
							<div className="flex flex-row bg-white p-3 rounded-2xl justify-between items-end">
								<div className="flex flex-row gap-2 items-center">
									<Jazzicon diameter={40} seed={jsNumberForAddress(address)} />
									<div className="flex flex-col items-start">
										<ShortAddress address={address} />
										<div>{date.toLocaleDateString()}</div>
									</div>
								</div>
								<div className="flex flex-row gap-3 items-center">
									<div>Ξ {ethToString(amount)}</div>
									<a href={`https://etherscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
										<Svg src={linkIcon} height={16} width={16} />
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}, [gnarId, gnarImage, bids]);

	return <BaseModal content={content} transparent={false} closeButton={false} onDismiss={onClose} />;
};
