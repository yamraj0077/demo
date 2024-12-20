import React from 'react';
import { Settings } from 'lucide-react';

interface ConversionOptionsProps {
  preserveFormatting: boolean;
  extractImages: boolean;
  onPreserveFormattingChange: (value: boolean) => void;
  onExtractImagesChange: (value: boolean) => void;
}

function ConversionOptions({
  preserveFormatting,
  extractImages,
  onPreserveFormattingChange,
  onExtractImagesChange
}: ConversionOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-700">
        <Settings className="h-4 w-4" />
        <span className="text-sm font-medium">Conversion Options</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="preserve-formatting"
            checked={preserveFormatting}
            onChange={(e) => onPreserveFormattingChange(e.target.checked)}
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
            onChange={(e) => onExtractImagesChange(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="extract-images" className="ml-2 text-sm text-gray-700">
            Extract and include images
          </label>
        </div>
      </div>
    </div>
  );
}

export default ConversionOptions;