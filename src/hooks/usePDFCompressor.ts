import { useState } from 'react';
import { compressPDF } from '../utils/pdf/compression';
import { validatePDF } from '../utils/pdf/validation';
import type { CompressionOptions } from '../utils/pdf/types';

interface PDFFile {
  file: File;
  name: string;
  size: number;
}

export function usePDFCompressor() {
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    const validationError = await validatePDF(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile({
      file,
      name: file.name,
      size: file.size
    });
    setCompressedSize(null);
    setError(null);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    setError(null);

    try {
      const options: CompressionOptions = {
        compressImages: true,
        removeMetadata: true,
        quality: 0.8
      };

      const compressedPdfBytes = await compressPDF(selectedFile.file, options);
      const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      
      setCompressedSize(blob.size);

      // Create and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const fileName = selectedFile.name.replace('.pdf', '-compressed.pdf');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to compress PDF. Please try again.';
      setError(errorMessage);
      setCompressedSize(null);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setCompressedSize(null);
    setError(null);
  };

  return {
    selectedFile,
    compressedSize,
    isCompressing,
    error,
    handleFileSelect,
    handleCompress,
    handleRemove
  };
}