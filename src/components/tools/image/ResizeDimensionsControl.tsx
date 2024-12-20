import React from 'react';
import { ImageDimensions } from '../../../utils/image/types';

interface ResizeDimensionsControlProps {
  dimensions: ImageDimensions;
  onDimensionChange: (dimension: 'width' | 'height', value: number) => void;
  maintainAspectRatio: boolean;
  onAspectRatioChange: (maintain: boolean) => void;
}

function ResizeDimensionsControl({
  dimensions,
  onDimensionChange,
  maintainAspectRatio,
  onAspectRatioChange
}: ResizeDimensionsControlProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Width (px)
        </label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => onDimensionChange('width', Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
          min="1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Height (px)
        </label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => onDimensionChange('height', Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
          min="1"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="aspect-ratio"
          checked={maintainAspectRatio}
          onChange={(e) => onAspectRatioChange(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="aspect-ratio" className="ml-2 text-sm text-gray-700">
          Maintain aspect ratio
        </label>
      </div>
    </div>
  );
}

export default ResizeDimensionsControl;