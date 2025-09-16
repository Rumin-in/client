import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="ml-2 text-xl font-semibold text-gray-800">Roomin</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-gray-700 hover:text-blue-500 transition-colors">
          Home
        </a>
        <a href="/rooms" className="text-gray-700 hover:text-blue-500 transition-colors">
          Room
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">
          Student Furniture
        </a>
      </nav>

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-gray-600 text-sm">More</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        
        <button onClick={()=>{navigate('/signin')}}  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          Log In
        </button>
        
        <button onClick={()=>{navigate('/signup')}} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;