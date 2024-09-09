import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import mainLogo from "../assets/main_logo.png";
import logo from "../assets/logo.png";

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
                  activeButton === "Home" ? "yellow" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                Explore
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
