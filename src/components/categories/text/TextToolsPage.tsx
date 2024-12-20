import React from 'react';
import CategoryPage from '../../layout/CategoryPage';
import { textTools } from '../../../constants/tools';

function TextToolsPage() {
  return (
    <CategoryPage
      title="Text Tools"
      description="Professional text processing tools at your fingertips"
      seoTitle="Text Tools - Free Online Text Editor and Analyzer"
      seoDescription="Free online text tools to format, analyze, and compare text. Easy to use, no installation needed. Process text securely in your browser."
      tools={textTools}
    />
  );
}

export default TextToolsPage;