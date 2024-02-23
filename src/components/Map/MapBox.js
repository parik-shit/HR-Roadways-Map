import React, { useContext } from 'react';
import MapComponent from './MapComponent';
import { ThemeContext } from '../../ThemeContext';

const MapBox = ({ updateSelectedDistricts }) => {
  const passSelectedDistrictsToBox = (districts) => {
    // Pass selected districts to the parent component (MapPage)
    updateSelectedDistricts(districts);
  };
  
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={` flex border ml-10  justify-center h-screen items-center w-3/4  ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <MapComponent passSelectedDistrictsToBox={passSelectedDistrictsToBox} />
    </div>
  );
};

export default MapBox;
