import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

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
