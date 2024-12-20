import { PDFDocument } from 'pdf-lib';
import { CompressionOptions } from './types';
import { removeMetadata } from './metadata';

const DEFAULT_OPTIONS: CompressionOptions = {
  quality: 0.8,
  removeMetadata: true
};

export async function compressPDF(
  file: File, 
  options: CompressionOptions = {}
): Promise<Uint8Array> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    // Load the PDF document
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: false,
      ignoreEncryption: true
    });
    
    if (opts.removeMetadata) {
      try {
        removeMetadata(pdfDoc);
      } catch (error) {
        console.warn('Failed to remove metadata:', error);
        // Continue with compression even if metadata removal fails
      }
    }
    
    // Save with optimized options
    return await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100,
      updateFieldAppearances: false
    });
  } catch (error) {
    console.error('PDF compression failed:', error);
    throw new Error('Failed to compress PDF. The file might be corrupted or password-protected.');
  }
}