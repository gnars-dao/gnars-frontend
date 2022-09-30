import { ChangeEvent, FC, useCallback, useState } from 'react';
import Svg from 'react-inlinesvg';
import styled from 'styled-components';
import infoIcon from '../../assets/images/info.svg';
import { Menu } from '../../components/Menu';
import { BaseModal2 } from '../../components/Modals/components/baseModal2/baseModal2';
import { arrayBufferToString } from '../../utils/utils';
import { Select } from './components/select/select';
import { TextButton } from './components/textButton/textButton';
import { CustomTraitType } from './types';

const ImageContainer = styled.div`
	display: grid;
	column-gap: 20px;
	row-gap: 16px;

	grid-template-columns: 1fr 1fr 1fr;

	@media (min-width: 1024px) {
		grid-template-columns: 190px 190px 190px;
		grid-auto-rows: 190px;
	}

	@media (min-width: 1280px) {
		grid-template-columns: 190px 190px 190px 190px;
		grid-auto-rows: 190px;
	}
`;

const ImageWraper = styled.div`
	display: flex;
	padding: 1px;
	justify-content: center;
	align-items: center;

	&:hover {
		padding: 0px;
	}
`;

const FileInput = styled.input`
	border: 1px solid #e2e3e8;
	border-radius: 4px;
	color: #8c8d92;
	padding-right: 10px;
	appearance: none;

	::file-selector-button {
		color: #212529;
		background-color: #e9ecef;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;
		border: none;
		border-inline-end-width: 1px;

		&:hover {
			background-color: #dde0e3;
		}
	}
`;

const Relative = styled.div`
	position: relative;
`;

const Absolute = styled.div`
	position: absolute;
	background-color: white;
	transform: translateY(-120%) translateX(-50%);
	white-space: nowrap;
	border: 1px solid #e2e3e8;
	border-radius: 4px;
	padding: 4px;
`;

const InfoIcon = styled(Svg)`
	color: rgb(172, 181, 189);
`;

interface IPlaygroundViewProps {
	backgrounds: Array<{ trait: string }>;
	bodies: Array<{ trait: string }>;
	accessories: Array<{ trait: string }>;
	heads: Array<{ trait: string }>;
	glasses: Array<{ trait: string }>;
	onCreateGnarImage: () => void;
	backgroundIndex: number;
	onChangeBackground: (backgroundIndex: number) => void;
	bodyIndex: number;
	onChangeBody: (bodyIndex: number) => void;
	accessoryIndex: number;
	onChangeAccessory: (accessoryIndex: number) => void;
	headIndex: number;
	onChangeHead: (headIndex: number) => void;
	glassesIndex: number;
	onChangeGlasses: (glassesIndex: number) => void;
	gnarImages: Array<string>;
	onUploadGnarImage: (fileName: string, data: string) => void;
	showUploadSelector: boolean;
	customTraitType: CustomTraitType;
	onChangeCustomTraitType: (customTraitType: CustomTraitType) => void;
	onSubmitCustomTrait: () => void;
	onClickGnarImage: (gnarImage: string) => void;
	gnarImagePng: string;
	onClickDownload: () => void;
	onCloseModal: () => void;
}

export const PlaygroundView: FC<IPlaygroundViewProps> = ({
	backgrounds,
	bodies,
	accessories,
	heads,
	glasses,
	onCreateGnarImage,
	backgroundIndex,
	onChangeBackground,
	bodyIndex,
	onChangeBody,
	accessoryIndex,
	onChangeAccessory,
	headIndex,
	onChangeHead,
	glassesIndex,
	onChangeGlasses,
	gnarImages,
	onUploadGnarImage,
	showUploadSelector,
	customTraitType,
	onChangeCustomTraitType,
	onSubmitCustomTrait,
	onClickGnarImage,
	gnarImagePng,
	onClickDownload,
	onCloseModal,
}) => {
	const [showInfo, setShowInfo] = useState(false);

	const handleChangeBackground = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeBackground(Number(event.target.selectedOptions[0].value));
		},
		[onChangeBackground]
	);

	const handleChangeBody = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeBody(Number(event.target.selectedOptions[0].value));
		},
		[onChangeBody]
	);
	const handleChangeAccessory = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeAccessory(Number(event.target.selectedOptions[0].value));
		},
		[onChangeAccessory]
	);
	const handleChangeHead = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeHead(Number(event.target.selectedOptions[0].value));
		},
		[onChangeHead]
	);
	const handleChangeGlasses = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeGlasses(Number(event.target.selectedOptions[0].value));
		},
		[onChangeGlasses]
	);

	const handleChangeCustomTraitType = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChangeCustomTraitType(event.target.selectedOptions[0].value as 'body' | 'accessory' | 'head' | 'glasses');
		},
		[onChangeCustomTraitType]
	);

	const handleMouseEnter = useCallback(() => setShowInfo(true), []);

	const handleMouseLeave = useCallback(() => setShowInfo(false), []);

	const handleUploadFile = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.files && event.target.files.length > 0) {
				const reader = new FileReader();
				const fileName = event.target.files[0].name;
				reader.addEventListener('load', (event) => {
					if (event.target?.result !== undefined && event.target?.result !== null) {
						const content =
							event.target.result instanceof ArrayBuffer
								? arrayBufferToString(event.target.result)
								: event.target.result;
						const matches = content.match(/(?:data:.*;base64,)(.*)/);
						if (matches) {
							onUploadGnarImage(fileName, matches[1]);
						}
					}
				});
				reader.readAsDataURL(event.target.files[0]);
			}
		},
		[onUploadGnarImage]
	);

	return (
		<div className="flex flex-col items-center w-full">
			<Menu enforceDarkLogo />
			<div className="flex flex-col">
				<div className="flex flex-col lg:container gap-4 px-4 pt-6">
					<div className="flex flex-col">
						<p className="text-bidsFor text-24px font-secondary">Explore</p>
						<p className="font-secondary text-56px">Playground</p>
					</div>
					{/* <p className="text-16px lg:max-w-4xl">
						The playground was built using the{' '}
						<RedLink href="https://www.notion.so/Noun-Protocol-32e4f0bf74fe433e927e2ea35e52a507">
							Nouns Protocol
						</RedLink>
						. Noun's traits are determined by the Noun Seed. The seed was generated using{' '}
						<RedLink href="https://github.com/nounsDAO/nouns-monorepo/tree/master/packages/nouns-assets">
							nouns-assets
						</RedLink>{' '}
						and rendered using the{' '}
						<RedLink href="https://github.com/nounsDAO/nouns-monorepo/tree/master/packages/nouns-sdk">
							nouns-sdk
						</RedLink>
						.
					</p> */}
					<div className="flex flex-col lg:flex-row gap-5 lg:pt-4">
						<div className="flex flex-col gap-3">
							<TextButton text="Generate Gnars" onClick={onCreateGnarImage} />
							<div className="flex flex-row lg:flex-col gap-6 lg:gap-3">
								<div className="flex flex-col flex-1 gap-3">
									<div className="flex flex-col">
										<label className="flex pl-4">Background</label>
										<Select className="flex" value={backgroundIndex} onChange={handleChangeBackground}>
											<option value={-1}>Random</option>
											{backgrounds.map(({ trait }, index) => {
												return <option value={index}>{trait}</option>;
											})}
										</Select>
									</div>
									<div className="flex flex-col">
										<label className="pl-4">Body</label>
										<Select value={bodyIndex} onChange={handleChangeBody}>
											<option value={-1}>Random</option>
											{bodies.map(({ trait }, index) => {
												return <option value={index}>{trait}</option>;
											})}
										</Select>
									</div>
									<div className="flex flex-col">
										<label className="pl-4">Accessory</label>
										<Select value={accessoryIndex} onChange={handleChangeAccessory}>
											<option value={-1}>Random</option>
											{accessories.map(({ trait }, index) => {
												return <option value={index}>{trait}</option>;
											})}
										</Select>
									</div>
								</div>
								<div className="flex flex-col flex-1 gap-3">
									<div className="flex flex-col">
										<label className="pl-4">Head</label>
										<Select value={headIndex} onChange={handleChangeHead}>
											<option value={-1}>Random</option>
											{heads.map(({ trait }, index) => {
												return <option value={index}>{trait}</option>;
											})}
										</Select>
									</div>
									<div className="flex flex-col">
										<label className="pl-4">Glasses</label>
										<Select value={glassesIndex} onChange={handleChangeGlasses}>
											<option value={-1}>Random</option>
											{glasses.map(({ trait }, index) => {
												return <option value={index}>{trait}</option>;
											})}
										</Select>
									</div>
								</div>
							</div>
							<div className="flex flex-col">
								<div className="flex flex-row gap-1">
									<label>Update Custom Trait</label>
									<div className="flex flex-col justify-center items-center">
										{showInfo && (
											<Relative>
												<Absolute>Only 32x32 PNG images are accepted</Absolute>
											</Relative>
										)}
										<InfoIcon
											src={infoIcon}
											height={16}
											width={16}
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
										/>
									</div>
								</div>
								<FileInput
									className="lg:max-w-250px text-15px"
									type="file"
									accept="image/PNG"
									onChange={handleUploadFile}
								/>
							</div>
							{showUploadSelector && (
								<div className="flex flex-col gap-3">
									<div className="flex flex-col">
										<label className="pl-4">Custom Trait Type</label>
										<Select value={customTraitType} onChange={handleChangeCustomTraitType}>
											<option value="body">Body</option>
											<option value="accessory">Accessory</option>
											<option value="head">Head</option>
											<option value="glasses">Glasses</option>
										</Select>
									</div>
									<TextButton text="Upload" onClick={onSubmitCustomTrait} />
								</div>
							)}
						</div>
						<ImageContainer>
							{gnarImages.map((image) => {
								return (
									<ImageWraper>
										<img className="rounded-2xl" src={image} onClick={() => onClickGnarImage(image)} />
									</ImageWraper>
								);
							})}
						</ImageContainer>
					</div>
				</div>
			</div>
			{gnarImagePng && (
				<BaseModal2 onClose={onCloseModal}>
					<div className="flex flex-col gap-3 items-center">
						<img className="rounded-2xl" src={gnarImagePng} />
						<div className="text-white text-16px font-bold">Use this Gnar as your profile picture!</div>
						<div className="flex flex-col w-full justify-center">
							<TextButton text="Download" onClick={onClickDownload} />
						</div>
					</div>
				</BaseModal2>
			)}
		</div>
	);
};
