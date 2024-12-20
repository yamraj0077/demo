import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  path: string;
  isActive: boolean;
}

function MenuItem({ icon: Icon, label, description, path, isActive }: MenuItemProps) {
  return (
    <div className="relative group">
      <Link 
        to={path}
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
          isActive 
            ? 'text-indigo-600 border-indigo-600' 
            : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Link>
      
      <div className="hidden group-hover:block absolute z-10 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <Icon className="h-5 w-5 text-indigo-600 mt-1" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;