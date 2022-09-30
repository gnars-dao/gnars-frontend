import { promises as fs } from 'fs';
import decode from 'image-decode';
import { fileNameToTrait } from '../../../utils/utils';
import { Image } from './image';
import { EncodedImage, IEncoder, ImageData } from './types';

/**
 * A class used to convert PNG images into the following RLE format:
 * Palette Index, Bounds [Top (Y), Right (X), Bottom (Y), Left (X)] (4 Bytes), [Pixel Length (1 Byte), Color Index (1 Byte)][].
 */
export class PNGCollectionEncoder implements IEncoder {
	private readonly _transparent: [string, number] = ['', 0];
	private _colors: Map<string, number> = new Map([this._transparent]);
	private _images: Map<string, string> = new Map();
	private _folders: { [name: string]: string[] } = {};

	constructor(palette: Array<string>) {
		this._colors = new Map();
		palette.forEach((color, index) => {
			this._colors.set(color, index);
		});
	}

	/**
	 * The flattened run-length encoded image data
	 */
	public get images(): EncodedImage[] {
		return this.format(true).root;
	}

	/**
	 * The run-length encoded image data and file names in their respective folders
	 */
	public get data(): ImageData {
		return { palette: [...this._colors.keys()], images: this.format() };
	}

	/**
	 * Decode a PNG image and re-encode using a custom run-length encoding
	 * @param image The image name
	 * @param png The png image data
	 * @param folder An optional containing folder name
	 */
	public encodeImage(name: string, png: Buffer, folder?: string): string {
		const { data, height, width } = decode(png);
		if (height !== 32 || width !== 32) {
			throw new Error('Invalid image size');
		}

		const image = new Image(width, height);
		const rle = image.toRLE((x, y) => this.rgbaAt(x, y, data, width), this._colors);

		this._images.set(name, rle);

		if (folder) {
			if (!this._folders[folder]) {
				this._folders[folder] = [];
			}
			this._folders[folder].push(name);
		}

		return rle;
	}

	/**
	 * Write the color palette and encoded part information to a JSON file
	 * @param outputFile The output file path and name
	 */
	public async writeToFile(outputFile = 'encoded-images.json'): Promise<void> {
		await fs.writeFile(outputFile, JSON.stringify(this.data, null, 2));
	}

	private rgbaAt(x: number, y: number, data: Array<number>, width: number) {
		const startIndex = y * 4 * width + x * 4;

		const foo = {
			r: data[startIndex],
			g: data[startIndex + 1],
			b: data[startIndex + 2],
			a: data[startIndex + 3],
		};
		return foo;
	}

	/**
	 * Return an object that contains all encoded images in their respective folders.
	 * @param flatten Whether all image data should be flattened (no sub-folders)
	 */
	private format(flatten = false) {
		const images = new Map(this._images);
		const folders = Object.entries(this._folders);

		let data: Record<string, EncodedImage[]> = {};
		if (!flatten && folders.length) {
			data = folders.reduce<Record<string, EncodedImage[]>>((result, [folder, filenames]) => {
				result[folder] = [];

				// Write all files to the folder, delete from the Map once written.
				filenames.forEach((filename) => {
					result[folder].push({
						filename,
						trait: fileNameToTrait(filename),
						data: images.get(filename) as string,
					});
					images.delete(filename);
				});

				return result;
			}, {});
		}

		// Write all remaining files to `root`
		if (images.size) {
			data.root = [...images.entries()].map(([filename, data]) => ({
				filename,
				trait: fileNameToTrait(filename),
				data,
			}));
		}
		return data;
	}
}
