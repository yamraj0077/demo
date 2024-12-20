import React, { useState } from 'react';
import { Type } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import FormatOptions from '../../../components/tools/text/FormatOptions';
import { formatText } from '../../../utils/textFormatters';

function TextFormatterPage() {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormat = (type: string) => {
    setText(formatText(text, type));
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <ToolPageLayout
      title="Text Formatter"
      description="Format and beautify your text with various styling options"
      seoTitle="Free Text Formatter - Format & Beautify Text Online | Developer Tools"
      seoDescription="Format and beautify your text with our free online text formatter. Support for multiple formatting options. Clean and organize your text instantly in your browser."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <Type className="h-5 w-5" />
          <span className="text-lg font-medium">Formatting Options</span>
        </div>

        <FormatOptions onFormat={handleFormat} />

        <div className="mt-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono resize-none"
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
            <li>Choose from the formatting options to transform your text</li>
            <li>Use multiple formatting options in sequence</li>
            <li>Click Clear to start over with new text</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default TextFormatterPage;