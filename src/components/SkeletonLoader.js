import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const SkeletonLoader = () => {
  const { darkMode } = useContext(ThemeContext);

  // Determine the background color and text color based on the theme
  const bgColor = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className={`rounded-md shadow-md p-4 mb-4 animate-pulse ${bgColor} ${textColor}`}>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-8 bg-gray-300 rounded mb-2"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="flex mt-4">
          <div className={`bg-blue-300 hover:bg-blue-400 font-semibold py-2 px-4 mr-2 rounded ${textColor}`}></div>
          <div className={`bg-red-300 hover:bg-red-400 font-semibold py-2 px-4 rounded ${textColor}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
