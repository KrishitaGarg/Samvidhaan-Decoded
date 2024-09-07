import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import yellowLogo from "../assets/yellow.png";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  const [activeButton, setActiveButton] = useState("Home");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [showText, setShowText] = useState(true);

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
      <footer className="footer">
        {showText && (
          <div className="footer-text-container">
            <div className="footer-text">
              Say hi to <span>Nyaya.AI</span>
            </div>
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
