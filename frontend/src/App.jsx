// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
import './index.css';

export default function App() {
  const { authUser, logout, checkAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const verifyAuth = async () => {
       await checkAuth();
      
      setIsLoading(false); 
    };
    verifyAuth();
  }, [checkAuth]); // Empty dependency array - runs once on mount
 if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={authUser} onLogout={logout} />

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* PUBLIC (only when NOT logged in) */}
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" replace />}
            />
            <Route
              path="/register"
              element={!authUser ? <Register /> : <Navigate to="/register" replace />}
            />

            {/* PROTECTED (only when logged in) */}
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile/:userId"
              element={authUser ? <Profile /> : <Navigate to="/login" replace />}
            />

            {/* CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <Toaster position="top-center" />
    </Router>
  );
}
