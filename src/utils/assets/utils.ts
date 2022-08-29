import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { bgcolors as bgcolorsV2, images as imagesV2 } from './image-data-V2.json';
import { bgcolors, images } from './image-data.json';
import { GnarData, GnarSeed } from './types';

/**
 * Get encoded part and background information using a Gnar seed
 * @param seed The Gnar seed
 */
export const getGnarData = (seed: GnarSeed): GnarData => {
	const { bodies, accessories, heads, glasses } = images;
	return {
		parts: [bodies[seed.body], accessories[seed.accessory], heads[seed.head], glasses[seed.glasses]],
		background: bgcolors[seed.background],
	};
};

export const getGnarDataV2 = (seed: GnarSeed): GnarData => {
	const { bodies, accessories, heads, glasses } = imagesV2;
	return {
		parts: [bodies[seed.body], accessories[seed.accessory], heads[seed.head], glasses[seed.glasses]],
		background: bgcolorsV2[seed.background],
	};
};

/**
 * Generate a random Gnar seed
 * @param seed The Gnar seed
 */
export const getRandomGnarSeed = (): GnarSeed => {
	const { bodies, accessories, heads, glasses } = images;
	return {
		background: Math.floor(Math.random() * bgcolors.length),
		body: Math.floor(Math.random() * bodies.length),
		accessory: Math.floor(Math.random() * accessories.length),
		head: Math.floor(Math.random() * heads.length),
		glasses: Math.floor(Math.random() * glasses.length),
	};
};

/**
 * Emulate bitwise right shift and uint cast
 * @param value A Big Number
 * @param shiftAmount The amount to right shift
 * @param uintSize The uint bit size to cast to
 */
export const shiftRightAndCast = (value: BigNumberish, shiftAmount: number, uintSize: number): string => {
	const shifted = BigNumber.from(value).shr(shiftAmount).toHexString();
	return `0x${shifted.substring(shifted.length - uintSize / 4)}`;
};

/**
 * Emulates the GnarSeeder.sol methodology for pseudorandomly selecting a part
 * @param pseudorandomness Hex representation of a number
 * @param partCount The number of parts to pseudorandomly choose from
 * @param shiftAmount The amount to right shift
 * @param uintSize The size of the unsigned integer
 */
export const getPseudorandomPart = (
	pseudorandomness: string,
	partCount: number,
	shiftAmount: number,
	uintSize: number = 48
): number => {
	const hex = shiftRightAndCast(pseudorandomness, shiftAmount, uintSize);
	return BigNumber.from(hex).mod(partCount).toNumber();
};

/**
 * Emulates the GnarSeeder.sol methodology for generating a Gnar seed
 * @param gnarId The Gnar tokenId used to create pseudorandomness
 * @param blockHash The block hash use to create pseudorandomness
 */
export const getGnarSeedFromBlockHash = (gnarId: BigNumberish, blockHash: string): GnarSeed => {
	const { bodies, accessories, heads, glasses } = images;
	const pseudorandomness = solidityKeccak256(['bytes32', 'uint256'], [blockHash, gnarId]);
	return {
		background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
		body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
		accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
		head: getPseudorandomPart(pseudorandomness, heads.length, 144),
		glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192),
	};
};
