import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <Link to="/" className="logo">Scroll&Shelf</Link>
        <ul className={`categories ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="#">Categories <i className="fas fa-caret-down"></i></Link>
            <div className="dropdown-menu">
              <Link to="#">Fiction</Link>
              <Link to="#">Non-Fiction</Link>
              <Link to="#">Romance</Link>
              <Link to="#">Self-Help</Link>
            </div>
          </li>
          <li><Link to="#">Wishlist</Link></li>
          <li><Link to="#">Reading History</Link></li>
        </ul>
      </div>

      {/* Middle Section */}
      <div className="search-bar">
        <input type="text" placeholder="Search for books, authors, or genres..." />
        <button><i className="fas fa-search"></i></button>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <Link to="#" className="premium"><i className="fas fa-crown"></i> Go Premium</Link>
        {isLoggedIn ? (
          <div className="profile">
            <Link to="#" className="profile-link"><i className="fas fa-user"></i></Link>
            <div className="profile-dropdown">
              <Link to="#">My Profile</Link>
              <Link to="#">My Subscription</Link>
              <Link to="#">Logout</Link>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login">Login</Link>
            <Link to="/signup" className="signup">Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}