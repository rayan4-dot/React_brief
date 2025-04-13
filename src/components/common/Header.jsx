// src/components/common/Header.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 w-full bg-zinc-900 text-white border-b border-zinc-800 shadow-sm z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <NavLink to="/" className="text-2xl font-bold text-fuchsia-400 hover:text-fuchsia-300 transition">
          E-learning
        </NavLink>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-fuchsia-400 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/tags"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            Tags
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
          >
            Stats
          </NavLink>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-zinc-900 border-t border-zinc-800 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
            onClick={toggleMenu}
          >
            Courses
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
            onClick={toggleMenu}
          >
            Categories
          </NavLink>
          <NavLink
            to="/tags"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
            onClick={toggleMenu}
          >
            Tags
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `text-fuchsia-400 hover:text-fuchsia-300 transition ${isActive ? 'underline underline-offset-4' : ''}`
            }
            onClick={toggleMenu}
          >
            Stats
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;