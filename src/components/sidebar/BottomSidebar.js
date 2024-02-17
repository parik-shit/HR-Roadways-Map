import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext
import { Chats,House,Plus } from "@phosphor-icons/react";
import SidebarLink from './SidebarLink';

const BottomSidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from the context

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-gray-200 text-gray-800 transition-all duration-300 ${
        isHovered ? 'h-32' : 'h-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex justify-center items-center">
        <SidebarLink to="/" text="Home" icon={House} darkMode={darkMode} />
        <SidebarLink to="/add" text="Add Task" icon={Plus} darkMode={darkMode} />
        <SidebarLink to="/" text="Chat Room" icon={Chats} darkMode={darkMode} />
        {/* Add more links for additional tabs */}
      </div>
    </div>
  );
};

export default BottomSidebar;
