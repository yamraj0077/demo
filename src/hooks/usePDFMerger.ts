import { useState } from 'react';
import { mergePDFs, downloadPDF } from '../utils/pdf/merger';

interface PDFFile {
  file: File;
  name: string;
  size: number;
}

export function usePDFMerger() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = (newFiles: File[]) => {
    const pdfFiles = newFiles
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        file,
        name: file.name,
        size: file.size
      }));
    setFiles(prev => [...prev, ...pdfFiles]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsMerging(true);
    setError(null);

    try {
      const mergedPdfBytes = await mergePDFs(files.map(f => f.file));
      downloadPDF(mergedPdfBytes, 'merged.pdf');
    } catch (err) {
      setError('Failed to merge PDFs. Please try again.');
      console.error('PDF merger error:', err);
    } finally {
      setIsMerging(false);
    }
  };

  return {
    files,
    isMerging,
    error,
    addFiles,
    removeFile,
    handleMerge
  };
}