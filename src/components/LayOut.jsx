import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import mainLogo from "../assets/main_logo.png";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";
import { useAuth } from "./AuthContex.jsx";
import { auth } from "./firebase.js";
import { FaUserAlt } from "react-icons/fa";

const Layout = ({ children }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const [showText, setShowText] = useState(true);
  const location = useLocation();

  const showStickyLogo =
    location.pathname === "/" || location.pathname === "/about";

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogoClick = () => {
    setActiveButton("Home"); // Reset to default when logo is clicked
  };

  const handleCloseText = () => {
    setShowText(false);
  };

  const { userLoggedIn, currentUser } = useAuth();

  return (
    <div>
      <header className="header">
        <nav>
          <div className="header-content">
            <Link to="/" className="nav-li name" onClick={handleLogoClick}>
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
                to="/start-trivia"
                className={`header-btn ${
                  activeButton === "Trivia" ? "button_color_change" : ""
                }`}
                onClick={() => handleButtonClick("Trivia")}
              >
                Trivia
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
              {userLoggedIn ? (
                <div className="header-btn profile-btn">
                  <img
                    src={
                      currentUser?.photoURL ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt="User"
                    className="user-image"
                  />
                  <div className="profile-dropdown">
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        auth.signOut();
                        handleButtonClick("Sign Out");
                      }}
                    >
                      <FaUserAlt className="profile-icon" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/sign"
                  className={`header-btn ${
                    activeButton === "Sign In" ? "button_color_change" : ""
                  }`}
                  onClick={() => handleButtonClick("Sign In")}
                >
                  Sign In
                </Link>
              )}
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
          <Link
            to="/chatbot"
            className={`sticky-logo-link ${
              activeButton === "Nyaya.AI" ? "button_color_change" : ""
            }`}
            onClick={() => handleButtonClick("Nyaya.AI")}
          >
            <img src={logo} alt="Logo" className="sticky-logo" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
