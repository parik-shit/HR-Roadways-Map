import React, { useRef, useEffect, useContext, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection'; // Import select from d3-selection
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext
import { SizeContext } from '../../SizeProvider'; // Import SizeContext from your SizeProvider


const MapComponent = () => {
  const svgRef = useRef();
  const { darkMode } = useContext(ThemeContext); // Access the theme mode from ThemeContext
  const { isSmallScreen } = useContext(SizeContext); // Access the size-related values from SizeContext
  const [geojsonData, setGeojsonData] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  // ... Rest of your code ...

  // Adjust the SVG width and height based on the screen size
  const [svgWidth, setSvgWidth] = useState(800);
  const [svgHeight, setSvgHeight] = useState(600);

  useEffect(() => {
    if (isSmallScreen) {
      setSvgWidth(400);
      setSvgHeight(300);
    } else {
      setSvgWidth(800);
      setSvgHeight(600);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Haryana.geojson');
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
    const projection = geoMercator()
      .fitSize([svgWidth, svgHeight], geojsonData); // Use the adjusted width and height

    const pathGenerator = geoPath().projection(projection);

    svg.selectAll('path').remove();

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
          .attr('fill', darkMode ? 'lightslategrey' : 'lightgray'); // Change fill color on hover
      })
      .on('mouseout', (event, d) => {
        select(event.target)
          .attr('fill', 'transparent'); // Reset fill color on mouseout only if it's not the currently hovered district
      });
  }, [geojsonData, darkMode, hoveredDistrict, svgWidth, svgHeight]); // Add hoveredDistrict and adjusted width/height to dependency array

  return (
    <div >
      {hoveredDistrict && (
        <div className='text-3xl text-orange-400 font-mono font-bold '>
          {hoveredDistrict}
        </div>
      )}
      <svg ref={svgRef} width={svgWidth} height={svgHeight}  className="w-full h-full ">
        {/* Adjust width and height as needed */}
      </svg>
    </div>
  );
};

export default MapComponent;
