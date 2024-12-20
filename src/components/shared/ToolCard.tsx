import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

function ToolCard({ id, title, description, icon: Icon, path }: ToolCardProps) {
  return (
    <Link 
      to={path}
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="inline-block p-3 bg-indigo-50 rounded-lg mb-4 group-hover:bg-indigo-100 transition-colors">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default ToolCard;