import { Component } from 'react';
import { followStore } from 'react-stores';
import { V2_START_ID } from '../../../constants/env';
import { web3Store } from '../../../store';
import { getBidHistory } from '../../../utils/api';
import imageDataV2 from '../../../utils/assets/image-data-V2.json';
import imageData from '../../../utils/assets/image-data.json';
import { getGnarData, getGnarDataV2 } from '../../../utils/assets/utils';
import { buildSVG } from '../../../utils/sdk/svg-builder';
import { BidsModalView } from './bidsModalView';

interface IBidsModalProps {
	gnarId: bigint;
	onClose: () => void;
}

interface IBidsModalState {
	gnarImage: string;
	bids: Array<{ address: string; date: Date; amount: bigint; transactionHash: string }>;
}

@followStore(web3Store)
export class BidsModal extends Component<IBidsModalProps, IBidsModalState> {
	state: IBidsModalState = {
		gnarImage: '',
		bids: [],
	};

	async componentDidMount() {
		this.updateGnarImage();
		this.updateBids();
	}

	async componentDidUpdate(prevProps: IBidsModalProps) {
		const { gnarId } = this.props;
		if (prevProps.gnarId !== gnarId) {
			this.updateGnarImage();
			this.updateBids();
		}
	}

	updateGnarImage = async () => {
		const { gnarId } = this.props;
		if (gnarId < V2_START_ID) {
			const res = await web3Store.state.skateContract.methods.seeds(gnarId).call();
			const seed = {
				background: res.background,
				body: res.body,
				accessory: res.accessory,
				head: res.head,
				glasses: res.glasses,
			};
			const { parts, background } = getGnarData(seed);
			const gnarImage = `data:image/svg+xml;base64,${Buffer.from(
				buildSVG(parts, imageData.palette, background),
				'utf8'
			).toString('base64')}`;
			this.setState({ gnarImage });
		} else {
			const res = await web3Store.state.skateContractV2.methods.seeds(gnarId).call();
			const seed = {
				background: res.background,
				body: res.body,
				accessory: res.accessory,
				head: res.head,
				glasses: res.glasses,
			};
			const { parts, background } = getGnarDataV2(seed);
			const gnarImage = `data:image/svg+xml;base64,${Buffer.from(
				buildSVG(parts, imageDataV2.palette, background),
				'utf8'
			).toString('base64')}`;
			this.setState({ gnarImage });
		}
	};

	updateBids = async () => {
		const { gnarId } = this.props;
		const bidHistory = await getBidHistory(gnarId);
		const bids = bidHistory.map(({ sender, amount, timestamp, transactionHash }) => ({
			address: sender,
			date: new Date(Number(timestamp) * 1000),
			amount: BigInt(amount),
			transactionHash,
		}));
		bids.sort((a, b) => (a.amount < b.amount ? 1 : -1));
		this.setState({ bids });
	};

	render() {
		const { gnarId, onClose } = this.props;
		const { gnarImage, bids } = this.state;

		return <BidsModalView gnarId={gnarId} gnarImage={gnarImage} bids={bids} onClose={onClose} />;
	}
}
