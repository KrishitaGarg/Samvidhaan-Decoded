import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import yellowLogo from "../assets/yellow.png";
import logo from "../assets/logo.png"; 

const Layout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [showText, setShowText] = useState(true);

  return (
    <div>
      <header className="header">
        <nav>
          <ul className={`sidebar ${sidebarVisible ? "d-flex" : "d-none"}`}>
            <li>
              <Link to="/" className="nav-li menu">
                Home
              </Link>
            </li>
            <li>
              <Link to="/game" className="nav-li menu">
                Game
              </Link>
            </li>
            <li>
              <Link to="/chatbot" className="nav-li menu">
                Nyaya.AI
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-li menu">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/signin" className="nav-li menu">
                Sign In
              </Link>
            </li>
            <li onClick={toggleSidebar}>
              <a href="#" className="nav-li">
                Close
              </a>
            </li>
          </ul>
          <div className="header-content">
            <Link to="/" className="nav-li name">
              <img src={yellowLogo} height="20" width="20" alt="Logo" /> संविधान
              Decoded
            </Link>
            <div className="header-buttons">
              <Link to="/" className="header-btn yellow">
                Home
              </Link>
              <Link to="/game" className="header-btn">
                Game
              </Link>
              <Link to="/chatbot" className="header-btn">
                Nyaya.AI
              </Link>
              <Link to="/about" className="header-btn">
                About Us
              </Link>
              <Link to="/signin" className="header-btn">
                Sign In
              </Link>
            </div>
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="50"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main>{children}</main>
      <footer className="footer">
        {showText && (
          <div className="footer-text-container">
            <span className="footer-text">Say hi to Nyaya.AI</span>
            <button className="close-button" onClick={() => setShowText(false)}>
              &times;
            </button>
          </div>
        )}
        <a href="/chatbot" className="footer-logo-container">
          <img src={logo} alt="Logo" className="footer-logo" />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
