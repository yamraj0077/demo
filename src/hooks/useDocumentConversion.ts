import { useState } from 'react';
import { validatePDF } from '../utils/pdf/validation';
import { convertPDFToWord } from '../utils/pdf/conversion/converter';
import type { ConversionOptions } from '../utils/pdf/conversion/types';

export function useDocumentConversion() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    const validationError = await validatePDF(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleConvert = async (options: ConversionOptions) => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);

    try {
      const result = await convertPDFToWord(selectedFile, options);
      
      // Trigger download
      const url = URL.createObjectURL(result.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('PDF to Word conversion requires a document conversion service or library. This feature is currently unavailable.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError(null);
  };

  return {
    selectedFile,
    isConverting,
    error,
    handleFileSelect,
    handleConvert,
    handleRemove
  };
}