import React, { useState } from 'react';
import { GitCompare } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import DiffViewer from '../../../components/tools/text/DiffViewer';
import { computeDiff } from '../../../utils/diffUtils';

function TextDiffPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const diff = computeDiff(text1, text2);

  return (
    <ToolPageLayout
      title="Text Compare"
      description="Compare two texts and find the differences"
      seoTitle="Free Text Comparison Tool - Find Text Differences Online | Developer Tools"
      seoDescription="Compare two texts side by side and highlight the differences. Perfect for finding changes between text versions, code snippets, or documents."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <GitCompare className="h-5 w-5" />
          <span className="text-lg font-medium">Text Comparison</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Text
            </label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste your original text here..."
              className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modified Text
            </label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste your modified text here..."
              className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Differences:</h3>
          <DiffViewer diff={diff} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Paste your original text in the left text area</li>
            <li>Paste your modified text in the right text area</li>
            <li>Differences will be highlighted automatically</li>
            <li>Green highlights show added text</li>
            <li>Red highlights show removed text</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default TextDiffPage;