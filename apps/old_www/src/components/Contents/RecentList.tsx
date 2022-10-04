import React, { FC } from 'react';
import styled from 'styled-components';
import auctionChart from '../../assets/images/auction-chart.jpeg';

const AuctionChart = styled.img`
	max-height: 600px;
`;

export const RecentList: FC = () => (
	<div className="flex flex-col pt-10 sm:pt-32 w-full">
		<div className="flex flex-col xl:flex-row gap-10 sm:gap-32 xl:gap-48 pb-10 justify-center items-center">
			<div className="font-secondary text-4xl sm:text-8xl flex justify-center">
				ONE GNAR,
				<br />
				LESS OFTEN,
				<br />
				FOREVER.
			</div>
			<AuctionChart src={auctionChart} />
		</div>
	</div>
);
