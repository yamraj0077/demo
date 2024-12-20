import React from 'react';
import { Star } from 'lucide-react';

interface PageTitleProps {
  title: string;
  subtitle: string;
}

function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
        <span className="text-amber-600 font-medium">Most Used Tools</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-xl text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}

export default PageTitle;