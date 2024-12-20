import React, { useState } from 'react';
import { FileDown, Upload, Download, Settings } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import { useDocumentConversion } from '../../../hooks/useDocumentConversion';

function PDFToWordPage() {
  const {
    selectedFile,
    isConverting,
    error,
    handleFileSelect,
    handleConvert,
    handleRemove
  } = useDocumentConversion();

  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [extractImages, setExtractImages] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const startConversion = () => {
    handleConvert({
      preserveFormatting,
      extractImages,
      outputFormat: 'docx'
    });
  };

  return (
    <ToolPageLayout
      title="PDF to Word Converter"
      description="Convert PDF files to editable Word documents"
      seoTitle="Free PDF to Word Converter - Convert PDF to DOCX Online | Developer Tools"
      seoDescription="Convert PDF files to editable Word documents online. Maintain formatting while converting PDFs to DOCX format."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <FileDown className="h-5 w-5" />
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
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="preserve-formatting"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="preserve-formatting" className="ml-2 text-sm text-gray-700">
                  Preserve formatting
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="extract-images"
                  checked={extractImages}
                  onChange={(e) => setExtractImages(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="extract-images" className="ml-2 text-sm text-gray-700">
                  Extract and include images
                </label>
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={startConversion}
                disabled={isConverting}
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isConverting ? (
                  'Converting...'
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Convert to Word
                  </>
                )}
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
            <li>Choose your conversion options</li>
            <li>Click "Convert to Word" to start the conversion</li>
            <li>Download the converted DOCX file when ready</li>
            <li>Your files are processed securely in your browser</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default PDFToWordPage;