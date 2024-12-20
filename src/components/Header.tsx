import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, FileText, Image, Type, Video, Code, QrCode, Settings, Menu, X } from 'lucide-react';
import MenuItem from './MenuItem';

const menuItems = [
  { icon: FileText, label: 'PDF Tools', path: '/tools/pdf', description: 'Convert, compress, merge and split PDF files with ease' },
  { icon: Image, label: 'Image Tools', path: '/tools/image', description: 'Compress, resize, and convert images between formats' },
  { icon: Type, label: 'Text Tools', path: '/tools/text', description: 'Format, convert, and analyze text content' },
  { icon: Video, label: 'Media Tools', path: '/tools/media', description: 'Convert and compress video and audio files' },
  { icon: Code, label: 'Dev Tools', path: '/tools/dev', description: 'Format and validate code, generate assets' },
  { icon: QrCode, label: 'QR Tools', path: '/tools/qr', description: 'Generate and scan QR codes instantly' },
  { icon: Settings, label: 'Utilities', path: '/tools/utilities', description: 'Various helpful tools for everyday tasks' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-3">
            <Wrench className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Free Online Tools</span>
          </Link>
          
          <nav className="hidden md:flex ml-8 space-x-8">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                description={item.description}
                path={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-indigo-600" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;