import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

const StateNameDisplay = ({ stateName }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`fixed bottom-12 left-15 p-4 bg-${darkMode ? 'gray-800' : 'gray-200'}  rounded-lg  w-64 h-24 text-${darkMode ? 'white' : 'gray-800'}`}>
      {/* Card content */}
      <p className="text-lg">{stateName}</p>
      {/* <p className="text-lg">Haryana</p> */}
    </div>
  );
};

export default StateNameDisplay;
