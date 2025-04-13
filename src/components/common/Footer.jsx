// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-fuchsia-400 mb-4">E-learning</h3>
            <p className="text-zinc-400">
              Master your skills with expert-led courses designed for professionals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fuchsia-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-zinc-300 hover:text-fuchsia-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-zinc-300 hover:text-fuchsia-400 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-zinc-300 hover:text-fuchsia-400 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/tags" className="text-zinc-300 hover:text-fuchsia-400 transition">
                  Tags
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-zinc-300 hover:text-fuchsia-400 transition">
                  Stats
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fuchsia-400 mb-4">Contact</h3>
            <p className="text-zinc-400">Email: rayan@E-learning.com</p>
            <p className="text-zinc-400">Phone: 212 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-zinc-500">
          © {new Date().getFullYear()} E-learning. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;