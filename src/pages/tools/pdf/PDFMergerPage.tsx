import React from 'react';
import { FilePlus, Upload } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import PDFFileList from '../../../components/tools/pdf/PDFFileList';
import { usePDFMerger } from '../../../hooks/usePDFMerger';

function PDFMergerPage() {
  const {
    files,
    isMerging,
    error,
    addFiles,
    removeFile,
    handleMerge
  } = usePDFMerger();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  return (
    <ToolPageLayout
      title="PDF Merger"
      description="Combine multiple PDF files into a single document"
      seoTitle="Free PDF Merger - Combine PDF Files Online | Developer Tools"
      seoDescription="Merge multiple PDF files into a single document with our free online PDF merger tool. Easy to use, secure PDF processing in your browser."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <FilePlus className="h-5 w-5" />
          <span className="text-lg font-medium">Select PDF Files</span>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="pdf-input"
          />
          <label htmlFor="pdf-input" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop PDF files here, or click to select
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Maximum 10 files, 10MB each
            </p>
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files:</h3>
            <PDFFileList files={files} onRemove={removeFile} />

            <button
              onClick={handleMerge}
              disabled={isMerging || files.length < 2}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isMerging ? 'Merging PDFs...' : 'Merge PDFs'}
            </button>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Select multiple PDF files by clicking or dragging and dropping</li>
            <li>Arrange the files in the desired order</li>
            <li>Click "Merge PDFs" to combine them into a single document</li>
            <li>Download the merged PDF when ready</li>
            <li>Your files are processed securely in your browser</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default PDFMergerPage;