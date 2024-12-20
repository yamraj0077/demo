import { ImageDimensions } from './types';

export const createOptimizedCanvas = (
  img: HTMLImageElement,
  dimensions: ImageDimensions
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Enable high-quality image scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Draw image with optimal dimensions
  ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  
  return canvas;
};