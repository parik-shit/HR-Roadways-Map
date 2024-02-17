import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Sun, Moon } from "@phosphor-icons/react";
const MoonIcon = () => (
  <Moon weight='fill' className="w-6 h-6 text-white" />
);
  
const SunIcon = () => (
  <Sun weight='fill' className="w-6 h-6 text-gray-600" />
);

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      className={`w-12 h-12 flex items-center justify-center rounded-md border border-gray-300 focus:outline-none ${
        darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};


export default ThemeToggle;
