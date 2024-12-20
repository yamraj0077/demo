import React from 'react';
import { Search } from 'lucide-react';

function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8">
          Free Online Tools for
          <span className="text-indigo-600"> Developers</span>
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Simplify your workflow with our collection of free online tools.
          No installation required, just use them right in your browser.
        </p>
        
        <div className="max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full px-4 py-3 focus:outline-none text-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;