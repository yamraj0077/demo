import React, { useState } from 'react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import TextStats from '../../../components/tools/text/TextStats';
import { Hash } from 'lucide-react';

function TextCounterPage() {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <ToolPageLayout
      title="Word Counter"
      description="Count words, characters, and paragraphs in your text"
      seoTitle="Free Word Counter - Count Words Online | Developer Tools"
      seoDescription="Count words, characters, sentences, and paragraphs in your text online. Get detailed statistics about your text content instantly."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <Hash className="h-5 w-5" />
          <span className="text-lg font-medium">Text Statistics</span>
        </div>

        <TextStats text={text} />

        <div className="mt-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear Text
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Type or paste your text in the text area above</li>
            <li>Statistics will update automatically as you type</li>
            <li>Use the Clear button to reset the text area</li>
            <li>All calculations are done instantly in your browser</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default TextCounterPage;