import React from 'react';
import CategoryPage from '../../../components/layout/CategoryPage';
import { imageTools } from '../../../constants/tools';

function ImageToolsPage() {
  return (
    <CategoryPage
      title="Image Tools"
      description="Professional image editing tools for all your needs"
      seoTitle="Free Image Tools - Online Image Editor and Converter"
      seoDescription="Free online image tools to compress, convert, and resize images. Process your images securely in your browser with our easy-to-use tools."
      tools={imageTools}
    />
  );
}

export default ImageToolsPage;