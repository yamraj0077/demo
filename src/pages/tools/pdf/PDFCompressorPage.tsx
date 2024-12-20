import React from 'react';
import { FileOutput, Upload } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import { usePDFCompressor } from '../../../hooks/usePDFCompressor';

function PDFCompressorPage() {
  const {
    selectedFile,
    compressedSize,
    isCompressing,
    error,
    handleFileSelect,
    handleCompress,
    handleRemove
  } = usePDFCompressor();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Reduce PDF file size while maintaining quality"
      seoTitle="Free PDF Compressor - Reduce PDF Size Online | Developer Tools"
      seoDescription="Compress PDF files online without losing quality. Reduce PDF size for easier sharing while maintaining document integrity."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <FileOutput className="h-5 w-5" />
          <span className="text-lg font-medium">Select PDF File</span>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-input"
          />
          <label htmlFor="pdf-input" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop a PDF file here, or click to select
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Maximum file size: 10MB
            </p>
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {selectedFile && (
          <div className="mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                Original size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                {compressedSize && (
                  <>
                    <br />
                    Compressed size: {(compressedSize / 1024 / 1024).toFixed(2)} MB
                    <br />
                    <span className="text-green-600">
                      Saved: {((selectedFile.size - compressedSize) / selectedFile.size * 100).toFixed(1)}%
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isCompressing ? 'Compressing...' : 'Compress PDF'}
              </button>

              <button
                onClick={handleRemove}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Select a PDF file by clicking or dragging and dropping</li>
            <li>Click "Compress PDF" to reduce the file size</li>
            <li>Download the compressed PDF when ready</li>
            <li>Your files are processed securely in your browser</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default PDFCompressorPage;