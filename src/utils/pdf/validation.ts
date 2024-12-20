import { PDFDocument } from 'pdf-lib';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const MIN_FILE_SIZE = 100; // 100 bytes

export async function validatePDF(file: File): Promise<string | null> {
  // Check file type
  if (!file.type.includes('pdf')) {
    return 'Invalid file type. Please provide a PDF file.';
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`;
  }

  if (file.size < MIN_FILE_SIZE) {
    return 'The PDF file appears to be empty or invalid';
  }

  try {
    // Try to read the first few bytes to verify it's a valid PDF
    const header = await readFileHeader(file, 5);
    if (!header.startsWith('%PDF-')) {
      return 'Invalid PDF file format. The file appears to be corrupted.';
    }
    
    return null;
  } catch (error) {
    return 'Failed to validate PDF file. The file might be corrupted.';
  }
}

async function readFileHeader(file: File, bytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as ArrayBuffer;
      const header = new Uint8Array(result);
      const decoder = new TextDecoder();
      resolve(decoder.decode(header));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file.slice(0, bytes));
  });
}