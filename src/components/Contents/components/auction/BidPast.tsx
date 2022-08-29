import { FC, useEffect, useState } from 'react';
import Svg from 'react-inlinesvg';
import { useStore } from 'react-stores';
import linkIcon from '../../../../assets/images/arrow-up-right-from-square-solid.svg';
// import birthdayIcon from '../../../../assets/images/birthday.svg';
import heartIcon from '../../../../assets/images/heart.svg';
import { V2_START_ID } from '../../../../constants/env';
import { displayGnarIdStore, web3Store } from '../../../../store';
import { getAuction } from '../../../../utils/api';
import { parseDate } from '../../../../utils/utils';
import { BidsModal } from '../../../Modals/bidsModal/bidsModal';
import { IconButton } from '../../../utils/iconButton/iconButton';
import { ShortAddress } from '../../../utils/ShortAddress';

export const BidPast: FC = () => {
	const { skateContract, skateContractV2 } = useStore(web3Store);
	const { display_gnarId } = useStore(displayGnarIdStore);
	const [ownerAddress, setOwnerAddress] = useState('');
	const [mintDate, setMintDate] = useState<Date | undefined>();
	const [showBidsModal, setShowBidsModal] = useState(false);
	const [contractAddress, setContractAddress] = useState('');

	useEffect(() => {
		(async () => {
			try {
				if (display_gnarId < V2_START_ID) {
					setContractAddress(skateContract.options.address);
					const newOwnerAddress: string = await skateContract.methods.ownerOf(display_gnarId).call();
					setOwnerAddress(newOwnerAddress);
				} else {
					setContractAddress(skateContractV2.options.address);
					const newOwnerAddress: string = await skateContractV2.methods.ownerOf(display_gnarId).call();
					setOwnerAddress(newOwnerAddress);
				}
			} catch (e) {
				setContractAddress('');
				setOwnerAddress('');
			}
		})();
	}, [display_gnarId, skateContract, skateContractV2]);

	useEffect(() => {
		(async () => {
			const auctions = await getAuction(display_gnarId);
			if (auctions.length > 0) {
				const [{ date }] = auctions;
				setMintDate(parseDate(date));
			} else {
				setMintDate(undefined);
			}
		})();
	}, [display_gnarId]);

	return (
		<>
			{ownerAddress && (
				<div className="flex flex-col gap-4 mt-4 text-18px">
					<>
						{/* {mintDate && (
							<div className="flex flex-row items-center">
								<Svg className="mr-2" src={birthdayIcon} /> Born {mintDate && mintDate.toLocaleDateString()}
							</div>
						)} */}
						<div className="flex flex-row items-center">
							<Svg className="mr-2" src={heartIcon} />
							Held by&nbsp;
							<a href={`https://etherscan.com/address/${ownerAddress}`} target="_blank" rel="noopener noreferrer">
								<ShortAddress address={ownerAddress} />
							</a>
							&nbsp;
							<Svg src={linkIcon} height={10} width={10} />
						</div>
						{mintDate && (
							<div className="flex flex-row gap-3">
								<div>
									<IconButton design="primary" icon="bids" text="Bid history" onClick={() => setShowBidsModal(true)} />
								</div>
								<a
									href={`https://etherscan.io/token/${contractAddress}?a=${display_gnarId}#inventory`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<IconButton design="primary" icon="tick" text="Etherscan" />
								</a>
							</div>
						)}
					</>
				</div>
			)}
			{showBidsModal && <BidsModal gnarId={display_gnarId} onClose={() => setShowBidsModal(false)} />}
		</>
	);
};
