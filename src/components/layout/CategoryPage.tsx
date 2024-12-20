import React from 'react';
import { LucideIcon } from 'lucide-react';
import SEOHead from '../shared/SEOHead';
import ToolCard from '../shared/ToolCard';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

interface CategoryPageProps {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tools: Tool[];
}

function CategoryPage({ title, description, seoTitle, seoDescription, tools }: CategoryPageProps) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;