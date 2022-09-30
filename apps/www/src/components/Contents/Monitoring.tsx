import { parse } from '@softstack/typed-stringify';
import { Component } from 'react';
import { connect } from 'react-redux';
import { followStore } from 'react-stores';
import { Dispatch } from 'redux';
import { BACKEND_WSS_URL } from '../../constants/env';
import { displayGnarIdStore } from '../../store';
import {
	updateAuctionEndTimestamp,
	updateCurrentGnarId,
	updateIsPaused,
	updateMinimumBid,
	updateRemainBlocks,
} from '../../store/auction/actions';
import { IRootState } from '../../store/store';
import {
	IAuctionEndTimestampEvent,
	IEventType,
	IGnarIdEvent,
	IMinimumBidEvent,
	IPausedEvent,
	IRemainBlocksEvent,
} from '../../types';
import { getAuctionEndTimestamp, getCurrentGnarId, getIsPaused, getMinimumBid, getRemainBlocks } from '../../utils/api';
import { sleep, updateBidListStore } from '../../utils/utils';
import { IRouterProps, withRouter } from '../utils/withRouter';

interface IMonitoringProps extends IRouterProps {
	currentGnarId: bigint;
	minimumBid: bigint;
	updateCurrentGnarId: (currentGnarId: bigint) => void;
	updateRemainBlocks: (remainBlocks: bigint | string, remainBlocksMajorVersion: bigint, override: boolean) => void;
	updateAuctionEndTimestamp: (auctionEndTimestamp: bigint | string, auctionEndTimestampMajorVersion: bigint) => void;
	updateIsPaused: (
		isPaused: boolean,
		isPausedMajorVersion: bigint,
		isPausedMinorVersion: bigint,
		override: boolean
	) => void;
	updateMinimumBid: (minimumBid: bigint, minimumBidMajorVersion: bigint, override: boolean) => void;
}

@followStore(displayGnarIdStore)
class Monitoring extends Component<IMonitoringProps> {
	auctionCreatedSubscribtion: any = undefined;
	auctionBidSubscribtion: any = undefined;
	auctionSettledSubscribtion: any = undefined;
	minBidIncrementPercentageUpdatedSubscribtion: any = undefined;
	reservePriceUpdatedSubscribtion: any = undefined;
	ws: WebSocket | undefined = undefined;
	reconnectWs = true;

	async componentDidMount() {
		this.startWebStocket();
	}

	componentDidUpdate(prevProps: IMonitoringProps) {
		const { minimumBid, currentGnarId } = this.props;
		if (prevProps.minimumBid !== minimumBid && displayGnarIdStore.state.display_gnarId === currentGnarId) {
			updateBidListStore(currentGnarId);
		}
		if (
			prevProps.currentGnarId !== currentGnarId &&
			prevProps.currentGnarId === currentGnarId - 1n &&
			displayGnarIdStore.state.display_gnarId === currentGnarId - 1n &&
			(this.props.location.pathname === '/' || this.props.location.pathname.match(/^\/gnar\//))
		) {
			this.props.navigate(`/gnar/${currentGnarId}`);
		}
	}

	componentWillUnmount() {
		if (this.ws) {
			this.reconnectWs = false;
			this.ws.close();
		}
	}

	updateValues = async () => {
		const currentGnarId = await getCurrentGnarId();
		this.props.updateCurrentGnarId(currentGnarId);
		if (displayGnarIdStore.state.display_gnarId < 0) {
			displayGnarIdStore.setState({
				display_gnarId: currentGnarId,
			});
		}
		const minimumBid = await getMinimumBid();
		this.props.updateMinimumBid(minimumBid, 0n, true);
		const remainBlocks = await getRemainBlocks();
		this.updateRemainBlocks(remainBlocks, 0n, true);
		const auctionEndTimestamp = await getAuctionEndTimestamp();
		this.updateAuctionEndTimestamp(auctionEndTimestamp, 0n);
		const isPaused = await getIsPaused();
		this.props.updateIsPaused(isPaused, 0n, 0n, true);
	};

	startWebStocket = async () => {
		while (true) {
			const ws = new WebSocket(`${BACKEND_WSS_URL}/api/webSocket`);
			while (ws.readyState === WebSocket.CONNECTING) {
				await sleep(100);
			}
			if (ws.readyState === WebSocket.OPEN) {
				await this.updateValues();
				this.ws = ws;

				this.ws.onclose = () => {
					if (this.reconnectWs) {
						this.ws = undefined;
						this.startWebStocket();
					}
				};

				this.ws.onmessage = (event) => {
					const { data } = event;
					const parsedEvent = parse(data);
					const { type } = parsedEvent as { type: IEventType };
					switch (type) {
						case 'gnarId': {
							const {
								payload: { currentGnarId },
							} = parsedEvent as IGnarIdEvent;
							this.props.updateCurrentGnarId(currentGnarId);
							break;
						}
						case 'remainBlocks': {
							const {
								payload: { remainBlocks, majorVersion },
							} = parsedEvent as IRemainBlocksEvent;
							this.updateRemainBlocks(remainBlocks, majorVersion, false);
							break;
						}
						case 'auctionEndTimestamp': {
							const {
								payload: { auctionEndTimestamp, majorVersion },
							} = parsedEvent as IAuctionEndTimestampEvent;
							this.updateAuctionEndTimestamp(auctionEndTimestamp, majorVersion);
							break;
						}
						case 'paused': {
							const {
								payload: { isPaused, majorVersion, minorVersion },
							} = parsedEvent as IPausedEvent;
							this.props.updateIsPaused(isPaused, majorVersion, minorVersion, false);
							break;
						}
						case 'minimumBid': {
							const {
								payload: { minimumBid, majorVersion },
							} = parsedEvent as IMinimumBidEvent;
							this.props.updateMinimumBid(minimumBid, majorVersion, false);
							break;
						}
					}
				};

				return;
			}
			await sleep(1000);
		}
	};

	// check how many blocks remains from 666
	updateRemainBlocks = (remainBlocks: bigint | null, majorVersion: bigint, override: boolean) => {
		if (remainBlocks === null) {
			this.props.updateRemainBlocks('Loading', majorVersion, override);
		} else if (remainBlocks < 0) {
			this.props.updateRemainBlocks('Waiting', majorVersion, override);
		} else {
			this.props.updateRemainBlocks(remainBlocks, majorVersion, override);
		}
	};

	updateAuctionEndTimestamp = (auctionEndTimestamp: bigint | null, majorVersion: bigint) => {
		if (auctionEndTimestamp === null) {
			this.props.updateAuctionEndTimestamp('Loading', majorVersion);
		} else {
			this.props.updateAuctionEndTimestamp(auctionEndTimestamp, majorVersion);
		}
	};

	render() {
		return null;
	}
}

const mapStateToProps = ({ auction: { currentGnarId, minimumBid } }: IRootState) => ({
	currentGnarId,
	minimumBid,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateCurrentGnarId: (currentGnarId: bigint) => dispatch(updateCurrentGnarId(currentGnarId)),
	updateRemainBlocks: (remainBlocks: bigint | string, remainBlocksMajorVersion: bigint, override: boolean) =>
		dispatch(updateRemainBlocks(remainBlocks, remainBlocksMajorVersion, override)),
	updateAuctionEndTimestamp: (auctionEndTimestamp: bigint | string, auctionEndTimestampMajorVersion: bigint) =>
		dispatch(updateAuctionEndTimestamp(auctionEndTimestamp, auctionEndTimestampMajorVersion)),
	updateIsPaused: (isPaused: boolean, isPausedMajorVersion: bigint, isPausedMinorVersion: bigint, override: boolean) =>
		dispatch(updateIsPaused(isPaused, isPausedMajorVersion, isPausedMinorVersion, override)),
	updateMinimumBid: (minimumBid: bigint, minimumBidMajorVersion: bigint, override: boolean) =>
		dispatch(updateMinimumBid(minimumBid, minimumBidMajorVersion, override)),
});

const monitoring = connect(mapStateToProps, mapDispatchToProps)(withRouter(Monitoring));

export { monitoring as Monitoring };
