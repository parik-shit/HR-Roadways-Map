import React from 'react';
import { ArrowRight, NavigationArrow } from "@phosphor-icons/react";

const Card = ({ selectedDistricts }) => {
    const [district1, district2] = selectedDistricts;

    return (
        <div className="bg-opacity-50 rounded-md p-6 flex justify-between items-center">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center flex-1">
                    <div className="fade-in bg-gray-700 bg-opacity-30 rounded-sm p-2 mx-2 flex-grow">
                        <p className="text-lg font-bold text-center text-orange-400">{district1}</p>
                    </div>
                    <div className="flex items-center mx-2">
                        <ArrowRight />
                    </div>
                    <div className="fade-in bg-gray-500 bg-opacity-30 rounded-md p-2 mx-2 flex-grow">
                        <p className="text-lg font-bold text-center text-orange-400">{district2}</p>
                    </div>
                </div>
            </div>
            {/* Other JSX */}
        </div>
    );
};

export default Card;
