import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Book, Bot } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl">LangMetrics</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <BarChart className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            
            <Link
              to="/grammar"
              className={`flex items-center space-x-1 ${
                isActive('/grammar') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Book className="h-5 w-5" />
              <span>Grammar</span>
            </Link>
            
            <Link
              to="/ai-coach"
              className={`flex items-center space-x-1 ${
                isActive('/ai-coach') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Bot className="h-5 w-5" />
              <span>AI Coach</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}