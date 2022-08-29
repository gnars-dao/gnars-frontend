export interface GnarSeed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface GnarData {
  parts: EncodedImage[];
  background: string;
}

export interface IGnarSeed {
  accessory: number;
  background: number;
  body: number;
  glasses: number;
  head: number;
}
