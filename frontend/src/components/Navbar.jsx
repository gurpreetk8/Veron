import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";
import logo from '../assets/logo.png';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <img src={logo} alt="Scroll&Shelf" className="logo-img" />

        <div className="nav-links">
          <a href="/" className="nav-item">Home</a>

          <div className="nav-item category-dropdown-wrapper">
            <a href="/Categories">Categories</a>
            <div className="category-dropdown">
              <a href="/Categories?type=Fiction">Fiction</a>
              <a href="/Categories?type=Non-Fiction">Non-Fiction</a>
            </div>
          </div>

          <a href="#" className="nav-item">Popular</a>
          <a href="#" className="nav-item">Request Book</a>
        </div>

      </div>

      <div className="right-section">
        {showSearch && (
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by Title Author or Series" 
              className="search-bar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch 
              className="search-bar-icon" 
              size={18} 
              onClick={handleSearch}
            />
          </div>
        )}
        <FaSearch 
          className="search-icon" 
          size={20} 
          onClick={() => setShowSearch(!showSearch)}
        />

        {user ? (
          <div className="user-info" ref={dropdownRef}>
            <div className="profile-wrapper" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.profile_picture && (
                <img
                  src={`http://localhost:8000${user.profile_picture}`}
                  alt="Profile"
                  className="profile-pic"
                />
              )}
              <span>{user.first_name}</span>
            </div>
            <div className={`profile-dropdown ${dropdownOpen ? 'show' : ''}`}>
              <a href="/UserDashboard">Profile</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <button className="login-button" onClick={() => window.location.href = "/LoginRegister"}>Log In</button>
        )}
      </div>
    </nav>
  );
}
