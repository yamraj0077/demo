import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEOHead from '../components/shared/SEOHead';

function NotFoundPage() {
  return (
    <>
      <SEOHead 
        title="Page Not Found - Free Online Developer Tools"
        description="The page you're looking for could not be found. Return to our homepage to access our free online developer tools."
      />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-indigo-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-4 text-lg text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
          <Link 
            to="/"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;