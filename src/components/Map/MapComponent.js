import React, { useRef, useEffect, useContext, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection'; // Import select from d3-selection
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext

const MapComponent = () => {
  const svgRef = useRef();
  const { darkMode } = useContext(ThemeContext); // Access the theme mode from ThemeContext
  const [geojsonData, setGeojsonData] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/haryana.geojson');
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!geojsonData) return; // If geojsonData is not available, return early

    const svg = select(svgRef.current); // Use select from d3-selection
    const width = 800; // Set a fixed width for the SVG container
    const height = 600; // Set a fixed height for the SVG container

    // Create a projection
    const projection = geoMercator()
      .fitSize([width, height], geojsonData);

    // Create a path generator
    const pathGenerator = geoPath().projection(projection);

    // Clear existing map content
    svg.selectAll('path').remove();

    // Draw the GeoJSON outline
    svg.selectAll('path')
    .data(geojsonData.features)
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .attr('fill', 'transparent') // Fill with a transparent color
    .attr('stroke', darkMode ? 'white' : 'black')
    .attr('stroke-width', 0.5)
    .on('mouseover', (event, d) => {
      setHoveredDistrict(d.properties.Dist_Name);
      select(event.target)
        .attr('fill', darkMode? 'lightslategrey':'lightgray'); // Change fill color on hover
    })
    .on('mouseout', (event, d) => {
      
        select(event.target)
          .attr('fill', 'transparent'); // Reset fill color on mouseout only if it's not the currently hovered district
      
    });

  }, [geojsonData, darkMode, hoveredDistrict]); // Add hoveredDistrict to dependency array

  return (
    <div>
      {hoveredDistrict && <div className='text-3xl text-orange-400 font-mono font-bold ' style={{ position: 'absolute', top: 0, left: 0 }}>{hoveredDistrict}</div>}
      <svg ref={svgRef} width={800} height={600} className="w-full h-full">
        {/* Adjust width and height as needed */}
      </svg>
    </div>
  );
};

export default MapComponent;
