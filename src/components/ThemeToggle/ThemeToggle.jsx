import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import "./ThemeToggle.css"; 

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="header-btn theme-toggle-btn">
      {theme === "light" ? "🌞" : "🌛"}
    </button>
  );
};

export default ThemeToggle;
