import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'react-stores';
import styled from 'styled-components';
import { V2_START_ID } from '../../constants/env';
import { displayGnarIdStore, gnarEnvStore } from '../../store';
import { IRootState } from '../../store/store';
import { updateIsDarkBackground } from '../../store/style/actions';
import { bgcolors as bgcolorV2 } from '../../utils/assets/image-data-V2.json';
import { Menu } from '../Menu';
import { Auction } from './components/Auction';
import { Gnar } from './components/Gnar';
import { Description } from './Description';
import { RecentList } from './RecentList';

// V2 background colors
// background-95 008080 dark
// background-cool d5d7e1 light
// background-damp 688679 dark
// background-ghost-crash 0827f5 dark
// background-greige bfbb98 light
// background-greyteal 5d8585 dark
// background-middlegrey 7d7d7d dark
// background-mold 666f5c dark
// background-sfx 00e000 light
// background-sweet ccbbcc light
// background-violet a7a0f3 light
// background-warm e1d7d5 light

const isBackgroundDark = (color: string) => {
	switch (color) {
		case '008080':
		case '688679':
		case '2f3635':
		case '0827f5':
		case '5d8585':
		case '7d7d7d':
		case '2b2a30':
		case '666f5c':
			return true;
		default:
			return false;
	}
};

const Background = styled.div<{ backgroundColor: string }>`
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const Top: FC = () => {
	window.scrollTo(0, 0);
	const { linkId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { auctionBG } = useStore(gnarEnvStore);
	const { display_gnarId } = useStore(displayGnarIdStore);
	const { currentGnarId } = useSelector((state: IRootState) => state.auction);
	const [isDarkBackground, setIsDarkBackground] = useState(false);
	const [currentBG, setCurrentBG] = useState('#d5d7e1');

	useEffect(() => {
		if (display_gnarId < V2_START_ID) {
			setIsDarkBackground(false);
			dispatch(updateIsDarkBackground(false));
			if (auctionBG === 0) {
				setCurrentBG('#d5d7e1');
			} else {
				setCurrentBG('#e1d7d5');
			}
		} else {
			setIsDarkBackground(isBackgroundDark(bgcolorV2[auctionBG]));
			dispatch(updateIsDarkBackground(isBackgroundDark(bgcolorV2[auctionBG])));
			setCurrentBG(`#${bgcolorV2[auctionBG]}`);
		}
	}, [auctionBG, display_gnarId, dispatch]);

	useEffect(() => {
		if (!linkId) {
			return;
		}
		// when manual gnar id > current gnar id
		if (Number(linkId) < 0 || (currentGnarId >= 0n && BigInt(linkId) > currentGnarId) || BigInt(linkId) < 0n) {
			navigate(`/gnar/${currentGnarId}`);
			return;
		}
		displayGnarIdStore.setState({
			display_gnarId: BigInt(linkId),
		});
	}, [linkId, currentGnarId, navigate]);

	return (
		<>
			<Background
				backgroundColor={currentBG}
				className={clsx('flex flex-col w-full items-center text-primaryText', isDarkBackground && 'dark')}
			>
				<Menu />
				<div className="flex flex-col lg:flex-row w-full ">
					<div className="flex flex-1 justify-center items-end">
						<div className="flex w-full justify-center lg:justify-end">
							<div className="w-full max-w-570px">
								<Gnar gnarId={`${display_gnarId}`} />
							</div>
						</div>
					</div>
					<div className="flex flex-1 bg-white lg:bg-inherit justify-center lg:justify-start">
						<Auction />
					</div>
				</div>
			</Background>
			<RecentList />
			<Description />
		</>
	);
};
