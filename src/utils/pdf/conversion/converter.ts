import { ConversionService } from './service';
import type { ConversionOptions, ConversionResult } from './types';

export async function convertPDFToWord(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  const service = ConversionService.getInstance();
  
  try {
    const convertedBlob = await service.convertPDFToWord(file);
    
    return {
      data: convertedBlob,
      filename: `${file.name.replace('.pdf', '')}.${options.outputFormat}`
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
    throw new Error('Conversion failed: Unknown error');
  }
}