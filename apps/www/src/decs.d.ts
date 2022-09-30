declare module 'image-decode' {
	function decode(data: Buffer): { data: Array<number>; height: number; width: number };
	export = decode;
}
