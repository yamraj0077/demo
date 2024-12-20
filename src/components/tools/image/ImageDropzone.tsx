import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

function ImageDropzone({ 
  onImageSelect, 
  accept = "image/*",
  maxSize = 10 * 1024 * 1024 // 10MB default
}: ImageDropzoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/') && file.size <= maxSize) {
      onImageSelect(file);
    }
  }, [onImageSelect, maxSize]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= maxSize) {
      onImageSelect(file);
    }
  }, [onImageSelect, maxSize]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors"
    >
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id="image-input"
      />
      <label htmlFor="image-input" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop an image here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </label>
    </div>
  );
}

export default ImageDropzone;