import React, { useState, useContext } from 'react';
import { SizeContext } from '../../SizeProvider'; // Assuming the SizeProvider is in a separate file
import MapBox from './MapBox';
// import MapStats from './MapStats';
import DistanceCalculator from './DistanceCalculator';
import Card from './Card';
import BusScheduleCard from './BusScheduleCard';

const columns = [
  {
    Header: 'SR',
    accessor: 'sr'
  },
  {
    Header: 'No',
    accessor: 'no'
  },
  {
    Header: 'Route',
    accessor: 'route'
  },
  {
    Header: 'Via',
    accessor: 'via'
  },
  {
    Header: 'Bus Type',
    accessor: 'busType'
  }
];

const MapPage = () => {
  const { isSmallScreen } = useContext(SizeContext);

  // State to manage selected districts
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  // Function to update selected districts
  const updateSelectedDistricts = (districts) => {
    setSelectedDistricts(districts);
  };

  return (
    <div className={`flex h-screen  ${isSmallScreen ? 'overflow-x-hidden' : ''}`}>
      {/* Sidebar (rendered only on larger screens) */}
      {!isSmallScreen && (
        <div className="w-16 bg-gray-200">
          {/* Sidebar content */}
        </div>
      )}

      {/* Main content area */}
      <div className="flex  flex-1">
        {/* Stats section */}
        <div className={` w-${isSmallScreen ? 'full' : '2/4'}`}>
          {/* Stats content */}
          <div className="mt-44 mx-auto w-2/3 ">
            {/* <MapStats /> */}
            <DistanceCalculator selectedDistricts={selectedDistricts}/>
            <Card selectedDistricts={selectedDistricts} />
            <BusScheduleCard columns={columns} />
          </div>
        </div>

        {/* Map section */}
        <div className={`border w-${isSmallScreen ? 'full' : '2/4'}`}>
          {/* Map content */}
          <MapBox updateSelectedDistricts={updateSelectedDistricts} />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
