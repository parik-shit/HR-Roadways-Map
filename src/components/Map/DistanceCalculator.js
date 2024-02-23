import React, { useState, useEffect } from 'react';

const DistanceCalculator = ({ distance }) => {
  const [prevDistance, setPrevDistance] = useState(0);

  useEffect(() => {
    setPrevDistance(distance);
  }, [distance]);

  return (
    <div className="w-full relative">
      <div className="w-full h-12 rounded-sm bg-gray-800 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">
          <DistanceCounter prevDistance={prevDistance} distance={distance} />
        </span>
        <span className="text-white text-2xl ml-2">km</span>
      </div>
    </div>
  );
};

const DistanceCounter = ({ prevDistance, distance }) => {
  const [displayDistance, setDisplayDistance] = useState(0);

  useEffect(() => {
    const animationDuration = 1000; // in milliseconds
    const framesPerSecond = 60;
    const increment = (distance - prevDistance) / (animationDuration / 1000 * framesPerSecond);

    let currentDistance = prevDistance;
    const interval = setInterval(() => {
      currentDistance += increment;
      setDisplayDistance(Math.round(currentDistance));

      if ((increment > 0 && currentDistance >= distance) || (increment < 0 && currentDistance <= distance)) {
        clearInterval(interval);
        setDisplayDistance(distance);
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(interval);
  }, [prevDistance, distance]); // Re-run effect when prevDistance or distance changes

  // Reset the displayDistance when distance changes
  useEffect(() => {
    setDisplayDistance(prevDistance);
  }, [prevDistance, distance]);

  return displayDistance;
};

export default DistanceCalculator;
