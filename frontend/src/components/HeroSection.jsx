import React from "react";
import "./HeroSection.css"; // Importing the CSS file

export default function HeroSection() {
  return (
    <div className="hero-section">
      {/* Background Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          For those who live a thousand lives through pages — 
          

        </h1>
        <p className="hero-subtitle">Scroll it, love it, shelf it.</p>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for books..." 
            className="search-input" 
          />
          <button className="search-button">Search</button>
        </div>

        {/* Call to Action Buttons */}
        <div className="hero-buttons">
          <button className="explore-btn">Explore Books</button>
          <button className="subscribe-btn">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
}
