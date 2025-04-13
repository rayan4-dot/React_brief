// src/components/common/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">hhhhhhh </h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition">
            Home
          </Link>
          <Link to="/categories" className="text-blue-400 hover:text-blue-300 transition">
            Categories
          </Link>
          <Link to="/tags" className="text-blue-400 hover:text-blue-300 transition">
            Tags
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;