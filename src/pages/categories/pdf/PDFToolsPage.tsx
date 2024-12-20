import React from 'react';
import CategoryPage from '../../../components/layout/CategoryPage';
import { pdfTools } from '../../../constants/tools';

function PDFToolsPage() {
  return (
    <CategoryPage
      title="PDF Tools"
      description="Professional PDF tools to merge, compress, and convert your documents"
      seoTitle="Free PDF Tools - Online PDF Editor and Converter"
      seoDescription="Free online PDF tools to merge, compress, and convert PDF files. Process your documents securely in your browser with our easy-to-use tools."
      tools={pdfTools}
    />
  );
}

export default PDFToolsPage;