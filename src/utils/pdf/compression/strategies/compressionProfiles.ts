export interface CompressionProfile {
  name: string;
  quality: number;
  imageScale: number;
  removeMetadata: boolean;
  optimizeFonts: boolean;
  optimizeColorSpaces: boolean;
}

export const compressionProfiles: CompressionProfile[] = [
  {
    name: 'light',
    quality: 0.9,
    imageScale: 1,
    removeMetadata: false,
    optimizeFonts: true,
    optimizeColorSpaces: false
  },
  {
    name: 'medium',
    quality: 0.7,
    imageScale: 0.8,
    removeMetadata: true,
    optimizeFonts: true,
    optimizeColorSpaces: true
  },
  {
    name: 'aggressive',
    quality: 0.5,
    imageScale: 0.6,
    removeMetadata: true,
    optimizeFonts: true,
    optimizeColorSpaces: true
  }
];