import { BigNumber, BigNumberish } from 'ethers';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Gnar } from '../Gnar';

interface HistoryCollectionProps {
	historyCount: number;
	latestGnarId: BigNumberish;
}

const gnardisplayCount = 7;

export const HistoryCollection: FC<HistoryCollectionProps> = (props: HistoryCollectionProps) => {
	let { historyCount, latestGnarId } = props;
	if (latestGnarId < 0) return null;
	if (latestGnarId < historyCount) {
		historyCount = latestGnarId as number;
	}
	const startAtZero = BigNumber.from(latestGnarId).sub(historyCount).lt(0);

	let gnarIds: Array<BigNumber | null> = new Array(historyCount);
	gnarIds = gnarIds.fill(null).map((_, i) => {
		if (BigNumber.from(i).lt(latestGnarId)) {
			const index = startAtZero ? BigNumber.from(0) : BigNumber.from(Number(latestGnarId) - historyCount);
			return index.add(i);
		} else {
			return null;
		}
	});

	// const gnarContent = gnarIds.map((gnarId, i) => {
	//   return <div key={i} className='pl-2 hover:opacity-75'><Link to={`/gnar/${gnarId}`}><Gnar gnarId={`${gnarId}`} /></Link></div>;
	// });
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: gnardisplayCount,
		slidesToScroll: 4,
	};
	// { gnarContent }
	return (
		<div className="px-4">
			<Slider {...settings}>
				{gnarIds.map((gnarId, i) => (
					<div key={i} className="pl-2 hover:opacity-75">
						<Link to={`/gnar/${gnarId}`}>
							<Gnar gnarId={`${gnarId}`} />
						</Link>
					</div>
				))}
			</Slider>
		</div>
	);
};
