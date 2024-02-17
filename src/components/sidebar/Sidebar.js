import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext
import { Chats,House,Plus,MapTrifold } from "@phosphor-icons/react";

import SidebarLink from './SidebarLink';


const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from the context

  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <div
      className={`h-screen w-16 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
      } fixed flex flex-col justify-center items-center transition-all duration-300 ${
        isHovered ? 'hover:w-48' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <SidebarLink to="/" text="Add Task" icon={House} darkMode={darkMode} />
      <hr className="w-4/5 border-gray-600 my-1" /> {/* Separator */}
      
      <SidebarLink to="/add" text="Add Task" icon={Plus} darkMode={darkMode} />
      <SidebarLink to="/" text="Chat Room" icon={Chats} darkMode={darkMode} />
      <SidebarLink to="/map" text="Map" icon={MapTrifold} darkMode={darkMode} />
      {/* Add more links for additional tabs */}
    </div>
  );
};

export default Sidebar;
