export interface IFilter {
  character: string;
  mask: string;
  item: string;
  background: string;
  label: string;
  exclusive: string;
  name: string;
}

export interface IMask {
  index: number;
  number: number;
  name: string;
  'Character Name': string;
  ipfs?: string;
  ipfsThumb: string;
  ipfsPreview?: string;
  image?: string;
  hash?: string;
}
