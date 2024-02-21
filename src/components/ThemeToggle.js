import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { SizeContext } from '../SizeProvider'; // Import the SizeContext
import { Sun, Moon } from "@phosphor-icons/react";

const MoonIcon = () => (
  <Moon weight='fill' className="w-6 h-6 text-white" />
);
  
const SunIcon = () => (
  <Sun weight='fill' className="w-6 h-6 text-gray-600" />
);

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isSmallScreen } = useContext(SizeContext); // Get the isSmallScreen value from SizeContext

  return (
    <button
      className={`w-12 h-12 flex items-center justify-center rounded-md border border-gray-300 focus:outline-none ${
        darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
      } ${isSmallScreen ? 'fixed' : ''}`} // Conditionally apply styles based on isSmallScreen
      // } ${isSmallScreen ? 'fixed bottom-16 left-0 ml-4 mb-4' : ''}`} // Conditionally apply styles based on isSmallScreen
      onClick={toggleDarkMode}
    >
      {darkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
