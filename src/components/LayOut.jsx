import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import yellowLogo from "../assets/yellow.png";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const [showText, setShowText] = useState(true);
  const location = useLocation();

  // Determine if the current path is Home or About Us
  const showNyayaAI =
    location.pathname === "/" || location.pathname === "/about";

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <header className="header">
        <nav>
          <div className="header-content">
            <Link to="/" className="nav-li name">
              <img src={yellowLogo} height="65" width="65" alt="Logo" /> संविधान
              Decode<span>d</span>
            </Link>
            <div className="header-buttons">
              <Link
                to="/"
                className={`header-btn ${
                  activeButton === "Home" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                Home
              </Link>
              <Link
                to="/startgame"
                className={`header-btn ${
                  activeButton === "Game" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("Game")}
              >
                Game
              </Link>
              <Link
                to="/chatbot"
                className={`header-btn ${
                  activeButton === "Nyaya.AI" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("Nyaya.AI")}
              >
                Nyaya.AI
              </Link>
              <Link
                to="/about"
                className={`header-btn ${
                  activeButton === "About Us" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("About Us")}
              >
                About Us
              </Link>
              <Link
                to="/signin"
                className={`header-btn ${
                  activeButton === "Sign In" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("Sign In")}
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>
      <footer className="layout-footer">
        {showNyayaAI && showText && (
          <div className="layout-footer-text-container">
            <div className="layoutfooter-text">
              Say hi to <span>Nyaya.AI</span>
            </div>
            <button
              className="layout-close-button"
              onClick={() => setShowText(false)}
            >
              &times;
            </button>
          </div>
        )}
        <a href="/chatbot" className="layout-footer-logo-container">
          <img src={logo} alt="Logo" className="layout-footer-logo" />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
