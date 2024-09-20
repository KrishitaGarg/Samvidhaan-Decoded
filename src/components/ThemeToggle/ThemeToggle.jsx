// src/components/ThemeToggle/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider"; // Import the correct path

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="header-btn">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggle;
