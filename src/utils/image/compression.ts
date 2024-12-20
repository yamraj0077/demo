import { CompressionOptions } from './types';
import { calculateOptimalDimensions } from './dimensions';
import { createOptimizedCanvas } from './canvas';

const DEFAULT_OPTIONS: CompressionOptions = {
  quality: 0.6, // Reduced default quality for better compression
  maxDimension: 1800, // Slightly reduced max dimension
  minQuality: 0.3,
  maxQuality: 0.8
};

export const compressImage = async (
  file: File, 
  options: Partial<CompressionOptions> = {}
): Promise<Blob> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Only compress JPEG and PNG
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    console.log('Unsupported image type, returning original');
    return file;
  }

  try {
    const img = await createImageFromFile(file);
    
    // Calculate optimal dimensions with some size reduction
    const dimensions = calculateOptimalDimensions(
      img.width,
      img.height,
      opts.maxDimension
    );
    
    // Create optimized canvas
    const canvas = createOptimizedCanvas(img, dimensions);
    
    // Progressive quality reduction strategy
    const qualities = [opts.quality, 0.5, 0.3];
    let bestBlob = await canvasToBlob(canvas, file.type, opts.quality);
    
    // Try different quality levels to find optimal compression
    for (const quality of qualities) {
      if (bestBlob.size > file.size * 0.9) { // If current blob is not small enough
        const newBlob = await canvasToBlob(canvas, file.type, quality);
        if (newBlob.size < bestBlob.size) {
          bestBlob = newBlob;
        }
      }
    }
    
    // Only return compressed version if it's actually smaller
    return bestBlob.size < file.size * 0.95 ? bestBlob : file;
  } catch (error) {
    console.error('Image compression failed:', error);
    return file;
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
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        type,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
};