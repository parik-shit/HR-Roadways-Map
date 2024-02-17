import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ to, text, icon: Icon, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={`p-2 hover:bg-gray-300 w-4/5 md:w-11/12 flex items-center justify-center rounded ${
        !darkMode && 'hover:text-gray-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || !isHovered) && <Icon size={24} className="mr-2 transition-all  transform hover:translate-x-2" />}
      {isHovered && <span className={`opacity-0 transition-opacity duration-300 delay-200 ${isHovered ? 'opacity-100' : ''}`}>{text}</span>}
      
      
    </Link>
    
  );
};

export default SidebarLink;
