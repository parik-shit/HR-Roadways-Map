import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MapComponent from './MapComponent';
// import StateNameDisplay from './MapInfo';
import { ThemeContext } from '../../ThemeContext';
import { useContext } from 'react';
const MapBox = () => {
  const {darkMode} = useContext(ThemeContext)
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ maxWidth: 768 });

  let mapSize = 'w-70p h-70p';
  if (isSmallScreen) {
    mapSize = 'w-40p h-40p';
  } else if (isMediumScreen) {
    mapSize = 'w-60p h-60p';
  }

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="ml-16">
        {/* Wrap the contents with ThemeProvider */}
          <div className={`relative ${mapSize}`}>
            <MapComponent />
            {/* <StateNameDisplay /> */}
          </div>
      </div>
    </div>
  );
};

export default MapBox;
