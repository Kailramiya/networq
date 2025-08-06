import { Link } from 'react-router-dom';
import { Home, Users, LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const naviagate = useNavigate();
  const {authUser, logout}=useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold text-gray-800 hidden sm:block">
                NetworQ
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {authUser ? (
              <>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
                >
                  <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
                >
                  <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Network</span>
                </Link>
                
                {/* User Profile Section */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <Link 
                    to ={`/profile/${authUser.id}`}
                    className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {authUser?.fullName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {authUser?.fullName?.toUpperCase() || 'User'}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-600 p-2 rounded-lg transition-all duration-200 hover:bg-red-50 group"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Join now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-200">
            {authUser ? (
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Network</span>
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    className="flex items-center space-x-3 px-3 py-2"
                    
                    navigate={`/profile/${authUser.id}`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {authUser?.fullName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {authUser?.fullName?.toUpperCase() || 'User'}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg transition-colors duration-200 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
