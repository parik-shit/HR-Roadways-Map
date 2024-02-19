import React from 'react';
import MapBox from './MapBox';
import MapStats from './MapStats';

const MapPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between"> {/* Apply the h-screen utility class and flex properties */}
      <div className=""> {/* Add margin to the top of the MapStats component */}
        <MapStats />
      </div>
      <MapBox />
    </div>
  );
};

export default MapPage;
