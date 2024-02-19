import React, { useContext } from 'react';
import MapComponent from './MapComponent';
// import { SizeContext } from '../../SizeProvider'; // Import SizeContext
import { ThemeContext } from '../../ThemeContext';

const MapBox = () => {
  const { darkMode } = useContext(ThemeContext);
  // const { isSmallScreen } = useContext(SizeContext); // Access isSmallScreen from SizeContext

 

  return (
    <div className={`flex justify-center h-screen items-center  ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <MapComponent />
    </div>
  );
};

export default MapBox;
