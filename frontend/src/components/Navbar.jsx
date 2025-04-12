import React, { useState } from 'react';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FiSearch, FiMoon, FiSun } from "react-icons/fi";

import './Navbar.css';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">Scroll & Shelf</div>

      {/* Centered Navigation Links and Search Icon */}
      <div className="nav-links">
        <ul className="menu">
          <li>Home</li>
          <li 
            className="categories" 
            onMouseEnter={() => setShowCategories(true)} 
            onMouseLeave={() => setShowCategories(false)}
          >
            Categories
            {showCategories && (
              <ul className="dropdown">
                <li>Fiction</li>
                <li>Non-Fiction</li>
                <li>Sci-Fi</li>
                <li>Mystery</li>
              </ul>
            )}
          </li>
        </ul>

        {/* Search Icon */}
        <div className="search-icon" onClick={() => setShowSearch(!showSearch)}>
          <FiSearch />
        </div>

        {showSearch && (
          <div className="search-bar">
            <input type="text" placeholder="Search books..." />
            <button>Search</button>
          </div>
        )}
      </div>

      {/* Dark Mode Toggle & Login Button */}
      <div className="right-side">
        
        <button className="login-btn">Login / Signup</button>
      </div>
    </nav>
  );
}