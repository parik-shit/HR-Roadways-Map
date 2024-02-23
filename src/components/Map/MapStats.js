import React, { useState } from 'react';

const MapStats = () => {
    const [activeStat, setActiveStat] = useState(null);

    const handleStatClick = (stat) => {
        setActiveStat(stat === activeStat ? null : stat);
    };

    return (
        <div className="flex   justify-center  items-center w-full h-full">
            <div className="flex items-center ">
                {/* Stat: Number of Bus */}
                <div className={`group stat bg-transparent border border-transparent p-4 rounded-tl-lg rounded-bl-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-100 ${activeStat === 'bus' ? 'bg-blue-100 border-blue-400 transform transition-transform duration-300' : ''}`} onClick={() => handleStatClick('bus')}>
                    <span className="text-blue-800 font-semibold flex justify-center items-center h-full">
                        Number of Bus
                    </span>
                    <p className="text-blue-800 font-bold text-2xl mt-1 flex justify-center items-center h-full">
                        250
                    </p>
                </div>
                {/* Stat: On Time */}
                <div className={`group stat bg-transparent border border-transparent p-4 rounded-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-100 ${activeStat === 'time' ? 'bg-green-100  transform transition-transform duration-300' : ''}`} onClick={() => handleStatClick('time')}>
                    <span className="text-green-600 font-semibold flex justify-center items-center h-full">
                        On Time
                    </span>
                    <p className="text-green-600 font-bold text-2xl mt-1 flex justify-center items-center h-full">
                        60%
                    </p>
                </div>
                {/* Stat: Average Speed */}
                <div className={`group stat bg-transparent border border-transparent p-4 rounded-tr-lg rounded-br-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-100 ${activeStat === 'speed' ? 'bg-yellow-100 border-yellow-400 transform transition-transform duration-300' : ''}`} onClick={() => handleStatClick('speed')}>
                    <span className="text-yellow-800 font-semibold flex justify-center items-center h-full">
                        Average Speed
                    </span>
                    <p className="text-yellow-800 font-bold text-2xl mt-1 flex justify-center items-center h-full">
                        40 mph
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapStats;
