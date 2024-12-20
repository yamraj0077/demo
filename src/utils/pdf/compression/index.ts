import { PDFDocument } from 'pdf-lib';
import { progressiveCompress } from './strategies/progressiveCompression';
import { CompressionOptions } from '../types';
import { validatePDF } from '../validation';

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  quality: 0.8,
  removeMetadata: true,
  compressImages: true
};

export async function compressPDF(
  file: File,
  options: CompressionOptions = {}
): Promise<Uint8Array> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    // Validate PDF file
    const validationError = await validatePDF(file);
    if (validationError) {
      throw new Error(validationError);
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF with enhanced error handling
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: false,
      ignoreEncryption: true
    }).catch(error => {
      if (error.message.includes('encrypted')) {
        throw new Error('This PDF is password protected. Please provide an unencrypted PDF.');
      }
      if (error.message.includes('cross-reference')) {
        throw new Error('The PDF file appears to be corrupted. Please try a different file.');
      }
      throw new Error('Failed to load PDF. The file might be corrupted or invalid.');
    });

    // Get initial size for comparison
    const initialSize = arrayBuffer.byteLength;
    
    // Try progressive compression
    const compressedData = await progressiveCompress(pdfDoc, initialSize);
    
    // Verify compression result
    if (compressedData.length >= initialSize) {
      throw new Error('Could not compress this PDF further. The file may already be optimized.');
    }

    return compressedData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to compress PDF. Please try again.';
    throw new Error(errorMessage);
  }
}