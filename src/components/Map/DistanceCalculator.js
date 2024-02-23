import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DistanceCalculator({ selectedDistricts }) {
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        if (selectedDistricts && selectedDistricts.length === 2) {
            const [originDistrict, destinationDistrict] = selectedDistricts;
            geocodeAndCalculateDistance(originDistrict, destinationDistrict);
        }
    }, [selectedDistricts]);

    const geocodeAndCalculateDistance = async (origin, destination) => {
        const apiKey = 'YAvZ7SKcl9A8_yZceNl1q9EWQh1V-_3Ps_Sto2IMtR2VnAe2nuYpTQpRyRrzzm8bs';
        const originCoords = await geocodeDistrict(origin, apiKey);
        const destinationCoords = await geocodeDistrict(destination, apiKey);

        if (originCoords && destinationCoords) {
            calculateDistance(originCoords, destinationCoords);
        }
    };

    const geocodeDistrict = async (district, apiKey) => {
        const encodedDistrict = encodeURIComponent(district);
        const url = `https://dev.virtualearth.net/REST/v1/Locations?q=${encodedDistrict}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const coordinates = response.data.resourceSets[0]?.resources[0]?.point?.coordinates;
            if (coordinates) {
                return `${coordinates[0]},${coordinates[1]}`;
            } else {
                console.error(`Failed to geocode district: ${district}`);
                return null;
            }
        } catch (error) {
            console.error('Error geocoding district:', error);
            return null;
        }
    };

    const calculateDistance = async (originCoords, destinationCoords) => {
        const apiKey = 'YAvZ7SKcl9A8_yZceNl1q9EWQh1V-_3Ps_Sto2IMtR2VnAe2nuYpTQpRyRrzzm8bs';
        const payload = {
            origins: [{
                latitude: originCoords.split(',')[0],
                longitude: originCoords.split(',')[1]
            }],
            destinations: [{
                latitude: destinationCoords.split(',')[0],
                longitude: destinationCoords.split(',')[1]
            }],
            travelMode: 'driving',
            startTime: 'now',
            timeUnit: 'second'
        };

        try {
            const response = await axios.post(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${apiKey}`, payload);
            const travelDistance = response.data.resourceSets[0].resources[0].results[0].travelDistance;
            setDistance(travelDistance);
        } catch (error) {
            console.error('Error fetching distance:', error);
        }
    };

    return (
        <div>
            {distance !== null ? (
                <p>Distance: {distance} miles</p>
            ) : (
                <p>Calculating distance...</p>
            )}
        </div>
    );
}

export default DistanceCalculator;
