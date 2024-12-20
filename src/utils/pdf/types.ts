export interface CompressionOptions {
  quality?: number;
  removeMetadata?: boolean;
  compressImages?: boolean;
}

export interface PDFPageImage {
  ref: any;
  width: number;
  height: number;
  bitsPerComponent: number;
  data: Uint8Array;
}