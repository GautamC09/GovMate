// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className="fixed w-full bg-[#0d0d0d] shadow-sm z-50 py-4 top-0">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">GovMate</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-350">Home</Link>
            <Link to="/services" className="text-white hover:text-gray-350">Services</Link>
            <Link to="/about" className="text-white hover:text-gray-350">About</Link>
            <Link to="/contact" className="text-white hover:text-gray-350">Contact</Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};