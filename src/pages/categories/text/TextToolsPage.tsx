import React from 'react';
import CategoryPage from '../../../components/layout/CategoryPage';
import { textTools } from '../../../constants/tools';

function TextToolsPage() {
  return (
    <CategoryPage
      title="Text Tools"
      description="Professional text processing tools for developers"
      seoTitle="Free Text Tools - Online Text Editor and Analyzer"
      seoDescription="Free online text tools to format, analyze, and compare text. Process your text securely in your browser with our easy-to-use developer tools."
      tools={textTools}
    />
  );
}

export default TextToolsPage;