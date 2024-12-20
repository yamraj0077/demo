import React from 'react';
import { X, Download } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  originalSize: number;
  compressedSize?: number;
  onRemove: () => void;
  onDownload?: () => void;
  canDownload?: boolean;
  downloadButtonText?: string;
}

function ImagePreview({ 
  src, 
  originalSize, 
  compressedSize, 
  onRemove,
  onDownload,
  canDownload = false,
  downloadButtonText = 'Download Image'
}: ImagePreviewProps) {
  return (
    <div className="relative">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <img src={src} alt="Preview" className="max-w-full h-auto" />
      </div>
      
      <div className="mt-4 space-y-4">
        <div className="text-sm text-gray-600 space-y-1">
          <p>Original size: {(originalSize / 1024).toFixed(2)} KB</p>
          {compressedSize && (
            <>
              <p>New size: {(compressedSize / 1024).toFixed(2)} KB</p>
              <p className="text-green-600">
                Saved: {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
              </p>
            </>
          )}
        </div>

        {canDownload && onDownload && (
          <button
            onClick={onDownload}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            {downloadButtonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ImagePreview;