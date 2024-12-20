import React from 'react';
import CategoryPage from '../../layout/CategoryPage';
import { imageTools } from '../../../constants/tools';

function ImageToolsPage() {
  return (
    <CategoryPage
      title="Image Tools"
      description="Professional image editing tools, right in your browser"
      seoTitle="Image Tools - Free Online Image Editor and Converter"
      seoDescription="Free online image tools to compress, convert, and resize images. Easy to use, no installation needed. Process images securely in your browser."
      tools={imageTools}
    />
  );
}

export default ImageToolsPage;