import React, { useRef, useEffect, useContext, useState } from 'react';
import { geoMercator, geoPath, geoInterpolate } from 'd3-geo';
import { select } from 'd3-selection';
import { ThemeContext } from '../../ThemeContext';
import { SizeContext } from '../../SizeProvider';

const MapComponent = () => {
  const svgRef = useRef();
  const { darkMode } = useContext(ThemeContext);
  const { isSmallScreen } = useContext(SizeContext);
  const [geojsonData, setGeojsonData] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

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

  const handleDistrictClick = (districtName) => {
    if (selectedDistricts.length < 2) {
      setSelectedDistricts(prevSelected => [...prevSelected, districtName]);
    } else {
      setSelectedDistricts([districtName]);
    }
  };

  useEffect(() => {
    if (!geojsonData) return;

    const svg = select(svgRef.current);
    const projection = geoMercator().fitSize([svgWidth, svgHeight], geojsonData);
    const pathGenerator = geoPath().projection(projection);

    svg.selectAll('path').remove();

    svg.selectAll('path')
      .data(geojsonData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', 'transparent')
      .attr('stroke', darkMode ? 'white' : 'black')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        setHoveredDistrict(d.properties.Dist_Name);
        select(event.target)
          .attr('fill', darkMode ? 'lightslategrey' : 'lightgray');
      })
      .on('mouseout', (event, d) => {
        if (!selectedDistricts.includes(d.properties.Dist_Name)) {
          select(event.target)
            .attr('fill', 'transparent');
        }
      })
      .on('click', (event, d) => {
        handleDistrictClick(d.properties.Dist_Name);
      });

  }, [geojsonData, darkMode, selectedDistricts, svgWidth, svgHeight]);

  useEffect(() => {
    if (selectedDistricts.length === 2) {
      const svg = select(svgRef.current);
      const projection = geoMercator().fitSize([svgWidth, svgHeight], geojsonData);
      const [district1, district2] = selectedDistricts.map(districtName => {
        const feature = geojsonData.features.find(feature => feature.properties.Dist_Name === districtName);
        return projection(geoPath().centroid(feature)); // Using centroid for simplicity
      });
  
      // Calculate the midpoint
      const midPoint = geoInterpolate(district1, district2)(0.5); // Midpoint at 50% of the distance
  
      // Create an arc path
      const path = `M${district1[0]},${district1[1]}Q${midPoint[0]},${midPoint[1]} ${district2[0]},${district2[1]}`;
  
      svg.selectAll('circle').remove(); // Remove existing circles
  
      // Append circle at the start point
      svg.append('circle')
        .attr('cx', district1[0])
        .attr('cy', district1[1])
        .attr('r', 8)
        .attr('fill', 'orange');
  
      // Append circle at the end point
      svg.append('circle')
        .attr('cx', district2[0])
        .attr('cy', district2[1])
        .attr('r', 4)
        .attr('fill', 'orange');
  
      // Append arc path
      svg.append('path')
        .attr('class', 'arc')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2);
    }
  }, [selectedDistricts, geojsonData, svgWidth, svgHeight]);
  
  return (
    <div>
      {hoveredDistrict && (
        <div className='text-3xl text-orange-400 font-mono font-bold '>
          {hoveredDistrict}
        </div>
      )}
      <svg ref={svgRef} width={svgWidth} height={svgHeight} className="w-full h-full ">
        {/* Adjust width and height as needed */}
      </svg>
    </div>
  );
};

export default MapComponent;
