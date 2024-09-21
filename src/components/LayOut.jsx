import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import mainLogo from "../assets/main_logo.png";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";

const Layout = ({ children }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const [showText, setShowText] = useState(true);
  const location = useLocation();

  const showStickyLogo =
    location.pathname === "/" || location.pathname === "/about";

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleCloseText = () => {
    setShowText(false);
  };

  return (
    <div>
      <header className="header">
        <nav>
          <div className="header-content">
            <Link to="/" className="nav-li name">
              <img src={mainLogo} height="55" width="55" alt="Logo" /> संविधान
              Decode<span>d</span>
            </Link>
            <div className="header-buttons">
              <Link
                to="/simplifier"
                className={`header-btn ${
                  activeButton === "Home" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                Explore
              </Link>
              <Link
                to="/startgame"
                className={`header-btn ${
                  activeButton === "Game" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("Game")}
              >
                Game
              </Link>
              <Link
                to="/chatbot"
                className={`header-btn ${
                  activeButton === "Nyaya.AI" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("Nyaya.AI")}
              >
                Nyaya.AI
              </Link>
              <Link
                to="/about"
                className={`header-btn ${
                  activeButton === "About Us" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("About Us")}
              >
                About Us
              </Link>
              <Link
                to="/sign"
                className={`header-btn ${
                  activeButton === "Sign In" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("Sign In")}
              >
                Sign In
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      {showStickyLogo && (
        <div className="sticky-logo-container">
          {showText && (
            <span className="sticky-text">
              Say hi to <span className="coffee">Nyaya.AI</span>
              <span className="close-button" onClick={handleCloseText}>
                &times;
              </span>
            </span>
          )}
          <a href="/chatbot" className="sticky-logo-link">
            <img src={logo} alt="Logo" className="sticky-logo" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Layout;
