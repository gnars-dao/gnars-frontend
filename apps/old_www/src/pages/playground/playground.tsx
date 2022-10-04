import { Canvg } from 'canvg';
import { saveAs } from 'file-saver';
import { Component } from 'react';
import imageDataV2 from '../../utils/assets/image-data-V2.json';
import { EncodedImage } from '../../utils/assets/types';
import { buildSVG } from '../../utils/sdk/svg-builder';
import { getRandomInteger } from '../../utils/utils';
import { PNGCollectionEncoder } from './encode/png-collection-encoder';
import { PlaygroundView } from './playgroundView';
import { CustomTraitType } from './types';

interface ExtEncodedImage extends EncodedImage {
	trait: string;
}

const createGnarImage = (
	background: string,
	body: EncodedImage,
	accessory: EncodedImage,
	head: EncodedImage,
	glasses: EncodedImage
) => {
	return `data:image/svg+xml;base64,${Buffer.from(
		buildSVG([body, accessory, head, glasses], imageDataV2.palette, background),
		'utf8'
	).toString('base64')}`;
};

interface IPlaygroundState {
	palette: Array<string>;
	backgrounds: Array<{ trait: string; color: string }>;
	bodies: Array<ExtEncodedImage>;
	accessories: Array<ExtEncodedImage>;
	heads: Array<ExtEncodedImage>;
	glasses: Array<ExtEncodedImage>;
	backgroundIndex: number;
	bodyIndex: number;
	accessoryIndex: number;
	headIndex: number;
	glassesIndex: number;
	gnarImages: Array<string>;
	uploadedGnarImage: ExtEncodedImage | undefined;
	customTraitType: CustomTraitType;
	gnarImagePng: string;
}

export class Playground extends Component<{}, IPlaygroundState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			palette: imageDataV2.palette,
			backgrounds: imageDataV2.images.backgrounds.map(({ trait }, index) => ({
				trait,
				color: imageDataV2.bgcolors[index],
			})),
			bodies: imageDataV2.images.bodies,
			accessories: imageDataV2.images.accessories,
			heads: imageDataV2.images.heads,
			glasses: imageDataV2.images.glasses,
			backgroundIndex: -1,
			bodyIndex: -1,
			accessoryIndex: -1,
			headIndex: -1,
			glassesIndex: -1,
			gnarImages: [],
			uploadedGnarImage: undefined,
			customTraitType: 'body',
			gnarImagePng: '',
		};
	}

	componentDidMount() {
		const { backgrounds, bodies, accessories, heads, glasses } = this.state;
		const gnarImages = new Array<string>();
		for (let i = 0; 8 > i; i++) {
			const backgroundIndex = getRandomInteger(0, backgrounds.length - 1);
			const bodyIndex = getRandomInteger(0, bodies.length - 1);
			const accessoryIndex = getRandomInteger(0, accessories.length - 1);
			const headIndex = getRandomInteger(0, heads.length - 1);
			const glassesIndex = getRandomInteger(0, glasses.length - 1);
			gnarImages.push(
				createGnarImage(
					backgrounds[backgroundIndex].color,
					bodies[bodyIndex],
					accessories[accessoryIndex],
					heads[headIndex],
					glasses[glassesIndex]
				)
			);
		}
		this.setState({ gnarImages });
	}

	handleCreateGnarImage = () => {
		const convertIndex = (index: number, maxIndex: number) => {
			if (index < 0) {
				return getRandomInteger(0, maxIndex);
			}
			return index;
		};

		const {
			backgroundIndex,
			bodyIndex,
			accessoryIndex,
			headIndex,
			glassesIndex,
			backgrounds,
			bodies,
			accessories,
			heads,
			glasses,
		} = this.state;
		const gnarImage = createGnarImage(
			backgrounds[convertIndex(backgroundIndex, backgrounds.length - 1)].color,
			bodies[convertIndex(bodyIndex, bodies.length - 1)],
			accessories[convertIndex(accessoryIndex, accessories.length - 1)],
			heads[convertIndex(headIndex, heads.length - 1)],
			glasses[convertIndex(glassesIndex, glasses.length - 1)]
		);
		this.setState(({ gnarImages }) => ({ gnarImages: [gnarImage, ...gnarImages] }));
	};

	handleChangeBackground = (backgroundIndex: number) => {
		this.setState({ backgroundIndex });
	};

	handleChangeBody = (bodyIndex: number) => {
		this.setState({ bodyIndex });
	};
	handleChangeAccessory = (accessoryIndex: number) => {
		this.setState({ accessoryIndex });
	};
	handleChangeHead = (headIndex: number) => {
		this.setState({ headIndex });
	};
	handleChangeGlasses = (glassesIndex: number) => {
		this.setState({ glassesIndex });
	};

	handleInsertUploadedGnarImage = (fileName: string, data: string) => {
		const { palette } = this.state;
		const encoder = new PNGCollectionEncoder(palette);
		encoder.encodeImage(fileName.replace(/\.png$/i, ''), Buffer.from(data, 'base64'), 'image');
		const newPalette = encoder.data.palette;
		const uploadedGnarImage = encoder.data.images['image'][0];
		this.setState({ uploadedGnarImage, palette: newPalette });
	};

	handleChangeCustomTraitType = (customTraitType: CustomTraitType) => {
		this.setState({ customTraitType });
	};

	handleSubmitCustomTrait = () => {
		const { uploadedGnarImage, customTraitType } = this.state;
		if (uploadedGnarImage) {
			switch (customTraitType) {
				case 'body':
					this.setState(({ bodies }) => ({ bodies: [uploadedGnarImage, ...bodies], bodyIndex: 0 }));
					break;
				case 'accessory':
					this.setState(({ accessories }) => ({ accessories: [uploadedGnarImage, ...accessories], accessoryIndex: 0 }));
					break;
				case 'head':
					this.setState(({ heads }) => ({ heads: [uploadedGnarImage, ...heads], headIndex: 0 }));
					break;
				case 'glasses':
					this.setState(({ glasses }) => ({ glasses: [uploadedGnarImage, ...glasses], glassesIndex: 0 }));
					break;
			}
		}
	};

	handleClickGnarImage = async (gnarImage: string) => {
		const canvas = document.createElement('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const v = await Canvg.from(ctx, gnarImage);
			v.start();
			this.setState({ gnarImagePng: canvas.toDataURL('image/png') });
		}
	};

	handleClickDownload = () => {
		const { gnarImagePng } = this.state;
		saveAs(gnarImagePng, 'gnar.png');
	};

	handleCloseModal = () => {
		this.setState({ gnarImagePng: '' });
	};

	render() {
		const {
			backgrounds,
			bodies,
			accessories,
			heads,
			glasses,
			backgroundIndex,
			bodyIndex,
			accessoryIndex,
			headIndex,
			glassesIndex,
			gnarImages,
			uploadedGnarImage,
			customTraitType,
			gnarImagePng,
		} = this.state;

		return (
			<PlaygroundView
				backgrounds={backgrounds}
				bodies={bodies}
				accessories={accessories}
				heads={heads}
				glasses={glasses}
				onCreateGnarImage={this.handleCreateGnarImage}
				backgroundIndex={backgroundIndex}
				onChangeBackground={this.handleChangeBackground}
				bodyIndex={bodyIndex}
				onChangeBody={this.handleChangeBody}
				accessoryIndex={accessoryIndex}
				onChangeAccessory={this.handleChangeAccessory}
				headIndex={headIndex}
				onChangeHead={this.handleChangeHead}
				glassesIndex={glassesIndex}
				onChangeGlasses={this.handleChangeGlasses}
				gnarImages={gnarImages}
				onUploadGnarImage={this.handleInsertUploadedGnarImage}
				showUploadSelector={!!uploadedGnarImage}
				customTraitType={customTraitType}
				onChangeCustomTraitType={this.handleChangeCustomTraitType}
				onSubmitCustomTrait={this.handleSubmitCustomTrait}
				onClickGnarImage={this.handleClickGnarImage}
				gnarImagePng={gnarImagePng}
				onClickDownload={this.handleClickDownload}
				onCloseModal={this.handleCloseModal}
			/>
		);
	}
}
