export interface ConversionOptions {
  preserveFormatting?: boolean;
  extractImages?: boolean;
  outputFormat: 'docx' | 'doc';
}

export interface ConversionResult {
  data: Blob;
  filename: string;
}