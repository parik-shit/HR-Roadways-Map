import React, { createContext, useState,useEffect } from "react";

const SizeContext = createContext();

const SizeProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Function to update screen size
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
    setIsMobileDevice(window.innerWidth <= 768 && window.innerHeight <= 768);
  };

  // Add event listener for resize events
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SizeContext.Provider value={{ isSmallScreen, isMobileDevice }}>
      {children}
    </SizeContext.Provider>
  );
};

export { SizeProvider, SizeContext }; // Exporting SizeProvider and SizeContext
