import { PDFDocument } from 'pdf-lib';
import { compressImages } from './imageCompression';
import { compressContent } from './contentCompression';
import { optimizeFonts } from './fontOptimization';
import { optimizeColorSpaces } from './colorSpaceOptimization';
import { removeMetadata } from '../../metadata';
import { compressionProfiles, CompressionProfile } from './compressionProfiles';

export async function progressiveCompress(
  pdfDoc: PDFDocument,
  originalSize: number
): Promise<Uint8Array> {
  let bestResult: { data: Uint8Array; profile: CompressionProfile } | null = null;
  let compressionAttempts = 0;
  
  for (const profile of compressionProfiles) {
    try {
      compressionAttempts++;
      
      // Create a copy of the PDF for this compression attempt
      const pdfCopy = await PDFDocument.load(await pdfDoc.save());
      
      // Apply compression strategies based on profile
      if (profile.compressImages) {
        await compressImages(pdfCopy, profile.quality);
      }
      
      await compressContent(pdfCopy);
      
      if (profile.optimizeFonts) {
        await optimizeFonts(pdfCopy);
      }
      
      if (profile.optimizeColorSpaces) {
        await optimizeColorSpaces(pdfCopy);
      }
      
      if (profile.removeMetadata) {
        await removeMetadata(pdfCopy);
      }
      
      const result = await pdfCopy.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false
      });
      
      // Keep the result if it's better than what we had
      if (!bestResult || result.length < bestResult.data.length) {
        bestResult = { data: result, profile };
        
        // If we achieved significant compression, we can stop
        if (result.length < originalSize * 0.7) {
          break;
        }
      }
    } catch (error) {
      console.warn(`Compression profile ${profile.name} failed:`, error);
      continue;
    }
  }
  
  if (!bestResult) {
    throw new Error('Failed to compress PDF after multiple attempts.');
  }
  
  if (bestResult.data.length >= originalSize) {
    throw new Error('Could not compress this PDF further. The file may already be optimized.');
  }
  
  return bestResult.data;
}