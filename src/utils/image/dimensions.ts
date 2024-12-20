import { ImageDimensions } from './types';

const MAX_DIMENSION = 2000;

export const calculateOptimalDimensions = (
  originalWidth: number, 
  originalHeight: number,
  maxDimension: number = MAX_DIMENSION
): ImageDimensions => {
  let width = originalWidth;
  let height = originalHeight;
  
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }
  
  return { width, height };
};