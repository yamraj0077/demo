import { ImageFormat, ConversionOptions } from './types';
import { createOptimizedCanvas } from './canvas';

export const convertImage = async (
  file: File,
  format: ImageFormat,
  options: Partial<ConversionOptions> = {}
): Promise<Blob> => {
  const { quality = 0.8 } = options;
  
  try {
    const img = await createImageFromFile(file);
    const canvas = createOptimizedCanvas(img, {
      width: img.width,
      height: img.height
    });
    
    const mimeType = `image/${format}`;
    return await canvasToBlob(canvas, mimeType, quality);
  } catch (error) {
    console.error('Image conversion failed:', error);
    throw new Error('Failed to convert image');
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