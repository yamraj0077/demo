import React from 'react';
import { Trash2 } from 'lucide-react';

interface PDFFile {
  name: string;
  size: number;
}

interface PDFFileListProps {
  files: PDFFile[];
  onRemove: (index: number) => void;
}

function PDFFileList({ files, onRemove }: PDFFileListProps) {
  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label={`Remove ${file.name}`}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default PDFFileList;