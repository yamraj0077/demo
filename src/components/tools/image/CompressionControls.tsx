import React from 'react';
import { Sliders } from 'lucide-react';

interface CompressionControlsProps {
  quality: number;
  onQualityChange: (quality: number) => void;
  onCompress: () => void;
  isCompressing: boolean;
}

function CompressionControls({
  quality,
  onQualityChange,
  onCompress,
  isCompressing
}: CompressionControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Sliders className="h-5 w-5 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">Compression Quality</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="0"
          max="100"
          value={quality * 100}
          onChange={(e) => onQualityChange(Number(e.target.value) / 100)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600 w-12">{Math.round(quality * 100)}%</span>
      </div>

      <button
        onClick={onCompress}
        disabled={isCompressing}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isCompressing ? 'Compressing...' : 'Compress Image'}
      </button>
    </div>
  );
}

export default CompressionControls;