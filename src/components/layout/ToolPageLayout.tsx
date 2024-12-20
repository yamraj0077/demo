import React from 'react';
import SEOHead from '../shared/SEOHead';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  children: React.ReactNode;
}

function ToolPageLayout({ title, description, seoTitle, seoDescription, children }: ToolPageLayoutProps) {
  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
      />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </>
  );
}

export default ToolPageLayout;