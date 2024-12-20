export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CompressionOptions {
  quality: number;
  maxDimension?: number;
  minQuality?: number;
  maxQuality?: number;
}

export type ImageFormat = 'jpeg' | 'png' | 'webp';

export interface ConversionOptions {
  quality: number;
}