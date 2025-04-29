import React, { useEffect } from "react";
import "./Footer.css";
import logo from '../assets/logo.png';

const Footer = () => {
  useEffect(() => {
    const footer = document.querySelector(".footer");
    const onScroll = () => {
      if (footer.getBoundingClientRect().top < window.innerHeight - 50) {
        footer.classList.add("show");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="footer">
      {/* Logo in the top left corner */}
      <div className="footer-logo-container">
        <img src={logo} alt="Scroll&Shelf Logo" className="footer-logo" />
      </div>

      {/* Social Icons */}
      <div className="footer-social">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-x-twitter"></i>
        <i className="fab fa-youtube"></i>
      </div>

      {/* Navigation Links */}
      <nav className="footer-nav">
        <a href="#">About</a>
        <a href="/Feedback">Feedback</a>
        <a href="#">Help</a>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Advertise</a>
        <a href="#">Contact</a>
      </nav>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 Scroll&Shelf. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
