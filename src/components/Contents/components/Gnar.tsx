import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStore } from 'react-stores';
import styled from 'styled-components';
import accessoryIcon from '../../../assets/images/traits/accessory.svg';
import bodyIcon from '../../../assets/images/traits/body.svg';
import glassesIcon from '../../../assets/images/traits/glasses.svg';
import headIcon from '../../../assets/images/traits/head.svg';
import { V2_START_ID } from '../../../constants/env';
import { displayGnarIdStore, gnarEnvStore, web3Store } from '../../../store';
import { IRootState } from '../../../store/store';
import imageDataV2 from '../../../utils/assets/image-data-V2.json';
import imageData from '../../../utils/assets/image-data.json';
import { IGnarSeed } from '../../../utils/assets/types';
import { getGnarData, getGnarDataV2 } from '../../../utils/assets/utils';
import { buildSVG } from '../../../utils/sdk/svg-builder';
import { Loading } from '../../utils/Loading';
import { LoadingV2 } from '../../utils/LoadingV2';

const getGnar = (gnarId: string, seed: IGnarSeed) => {
	const id = gnarId.toString();
	const name = `Gnar ${id}`;
	const description = `Gnar ${id} both skater and terrain`;
	const { parts, background } = BigInt(gnarId) < V2_START_ID ? getGnarData(seed) : getGnarDataV2(seed);
	const image = `data:image/svg+xml;base64,${Buffer.from(
		buildSVG(parts, BigInt(gnarId) < V2_START_ID ? imageData.palette : imageDataV2.palette, background),
		'utf8'
	).toString('base64')}`;
	return {
		name,
		description,
		image,
	};
};

const TraitsContainer = styled.div<{ x: number; y: number; flip: boolean }>`
	position: fixed;
	/* height: 100px;
	width: 100px; */
	background-color: white;
	border-radius: 20px;
	top: ${({ y, flip }) => (flip ? `${y + 15}px` : `${y - 15}px`)};
	left: ${({ x }) => `${x}px`};
	transform: ${({ flip }) => `translateX(-50%) ${flip ? '' : 'translateY(-100%)'}`};
	z-index: 1000;
`;

const Foo = styled.div<{ flip: boolean }>`
	display: flex;
	position: absolute;
	border-radius: 20px;
	height: 20px;
	/* width: 100px; */
	top: ${({ flip }) => (flip ? 0 : undefined)};
	bottom: ${({ flip }) => (flip ? undefined : 0)};
	left: 0;
	right: 0;
	justify-content: center;
	align-items: ${({ flip }) => (flip ? 'flex-start' : 'flex-end')};
`;

const Bar = styled.div<{ flip: boolean }>`
	height: 20px;
	width: 20px;
	background-color: white;
	transform: ${({ flip }) => `rotate(45deg) translateY(${flip ? '-' : ''}4px)`};
`;

const TraitIcon = styled.img`
	height: 24px;
`;

interface IGnarProps {
	gnarId: string;
}

export const Gnar: FC<IGnarProps> = ({ gnarId }) => {
	const { currentGnarId, isPaused } = useSelector((state: IRootState) => state.auction);
	const { skateContract, skateContractV2 } = useStore(web3Store);
	const { display_gnarId } = useStore(displayGnarIdStore);

	const [gnarDetail, setGnarDetail] = useState(Object);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [showTraits, setShowTraits] = useState(false);
	const [seed, setSeed] = useState<IGnarSeed | undefined>();

	useEffect(() => {
		setSeed(undefined);
		setGnarDetail({});
		if (Number(gnarId) < 0) {
			return;
		}

		if (Number(gnarId) < V2_START_ID) {
			skateContract.methods
				.seeds(gnarId)
				.call()
				.then((res: any) => {
					if (Number(display_gnarId) === Number(gnarId)) {
						gnarEnvStore.setState({
							auctionBG: Number(res.background),
						});
					}
					const seedFromContract = {
						background: res.background,
						body: res.body,
						accessory: res.accessory,
						head: res.head,
						glasses: res.glasses,
					};
					const gnar = getGnar(gnarId, seedFromContract);
					setGnarDetail(gnar);
				});
		} else {
			if (BigInt(gnarId) !== V2_START_ID || !isPaused) {
				skateContractV2.methods
					.seeds(gnarId)
					.call()
					.then((res: any) => {
						if (Number(display_gnarId) === Number(gnarId)) {
							gnarEnvStore.setState({
								auctionBG: Number(res.background),
							});
						}
						const seedFromContract = {
							background: res.background,
							body: res.body,
							accessory: res.accessory,
							head: res.head,
							glasses: res.glasses,
						};
						setSeed(seedFromContract);
						const gnar = getGnar(gnarId, seedFromContract);
						setGnarDetail(gnar);
					});
			}
		}
	}, [gnarId, skateContract, skateContractV2, isPaused, currentGnarId, display_gnarId]);

	const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
		setX(event.clientX);
		setY(event.clientY);
		setShowTraits(true);
	}, []);

	const handleMouseEnter = useCallback(() => {
		setShowTraits(true);
	}, []);

	const handleMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
		if (event.relatedTarget) {
			let element: HTMLElement | null = event.relatedTarget as HTMLElement;
			while (element) {
				const id = element.id;
				if (id === 'gnar' || id === 'traits') {
					return;
				}
				element = element.parentElement;
			}
		}
		setShowTraits(false);
	}, []);

	const traits = useMemo<{ head: string; body: string; accessory: string; glasses: string } | undefined>(() => {
		if (!seed || display_gnarId < V2_START_ID) {
			return undefined;
		}
		return {
			head: imageDataV2.images.heads[seed.head].trait,
			body: imageDataV2.images.bodies[seed.body].trait,
			accessory: imageDataV2.images.accessories[seed.accessory].trait,
			glasses: imageDataV2.images.glasses[seed.glasses].trait,
		};
	}, [seed, display_gnarId]);

	const flip = useMemo(() => y < 350, [y]);

	return (
		<div>
			{gnarDetail && gnarDetail.image ? (
				<>
					<div
						id="gnar"
						className="flex justify-center items-end"
						onMouseMove={handleMouseMove}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<img src={gnarDetail.image} alt={'loading noun'} className="w-full" />
					</div>
					{traits && showTraits && (
						<TraitsContainer
							id="traits"
							className="hidden lg:flex px-12 py-6"
							x={x}
							y={y}
							flip={flip}
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
						>
							<div className="flex flex-col gap-4 font-secondary text-3xl">
								<div className="flex gap-4 items-center whitespace-nowrap">
									<TraitIcon src={headIcon} />
									{traits.head}
								</div>
								<div className="flex gap-4 items-center whitespace-nowrap">
									<TraitIcon src={glassesIcon} />
									{traits.glasses}
								</div>
								<div className="flex gap-4 items-center whitespace-nowrap">
									<TraitIcon src={bodyIcon} />
									{traits.body}
								</div>
								<div className="flex gap-4 items-center whitespace-nowrap">
									<TraitIcon src={accessoryIcon} />
									{traits.accessory}
								</div>
							</div>
							<Foo flip={flip}>
								<Bar flip={flip} />
							</Foo>
						</TraitsContainer>
					)}
				</>
			) : display_gnarId < V2_START_ID ? (
				<Loading />
			) : (
				<LoadingV2 />
			)}
		</div>
	);
};
