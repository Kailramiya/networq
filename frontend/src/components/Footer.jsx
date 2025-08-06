import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            Help Center
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            Privacy & Terms
          </a>
        </div>
        
      </div>
    </footer>
  );
}