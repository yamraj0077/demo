import { PDFDocument } from 'pdf-lib';
import { PDFPageImage } from './types';

export async function compressImage(image: PDFPageImage, quality: number): Promise<Uint8Array> {
  // Create a canvas to compress the image
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  
  // Draw the image data to canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Create ImageData from the PDF image data
  const imageData = new ImageData(
    new Uint8ClampedArray(image.data),
    image.width,
    image.height
  );
  ctx.putImageData(imageData, 0, 0);
  
  // Get compressed image data
  const compressedData = await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      'image/jpeg',
      quality
    );
  });
  
  return new Uint8Array(await compressedData.arrayBuffer());
}