import React from 'react';
import CategoryPage from '../../layout/CategoryPage';
import { pdfTools } from '../../../constants/tools';

function PDFToolsPage() {
  return (
    <CategoryPage
      title="PDF Tools"
      description="Complete suite of free online PDF tools to handle all your document needs"
      seoTitle="PDF Tools - Free Online PDF Converter and Editor"
      seoDescription="Free online PDF tools to merge, compress, convert PDF files. Easy to use, no installation needed. Process PDFs securely in your browser."
      tools={pdfTools}
    />
  );
}

export default PDFToolsPage;