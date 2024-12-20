import { ImageDimensions } from './types';
import { createOptimizedCanvas } from './canvas';

export const resizeImage = async (
  file: File,
  dimensions: ImageDimensions,
  options: { quality?: number; format?: string } = {}
): Promise<Blob> => {
  const { quality = 0.9, format = file.type } = options;

  try {
    // Create image from file
    const img = await createImageFromFile(file);
    
    // Create canvas with new dimensions
    const canvas = createOptimizedCanvas(img, dimensions);
    
    // Convert to blob
    const blob = await canvasToBlob(canvas, format, quality);
    return blob;
  } catch (error) {
    console.error('Image resizing failed:', error);
    throw new Error('Failed to resize image');
  }
};

const createImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      type,
      quality
    );
  });
};