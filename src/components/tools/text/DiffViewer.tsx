import React from 'react';
import { DiffResult } from '../../../utils/diffUtils';

interface DiffViewerProps {
  diff: DiffResult[];
}

function DiffViewer({ diff }: DiffViewerProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
      {diff.map((part, index) => (
        <div
          key={index}
          className={`${
            part.added
              ? 'bg-green-50 text-green-800'
              : part.removed
              ? 'bg-red-50 text-red-800'
              : 'text-gray-800'
          } py-1 px-2 whitespace-pre-wrap`}
        >
          {part.value}
        </div>
      ))}
    </div>
  );
}

export default DiffViewer;