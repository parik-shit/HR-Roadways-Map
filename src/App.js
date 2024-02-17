import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ThemeProvider, ThemeContext } from './ThemeContext'; // Import the ThemeProvider
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/sidebar/Sidebar'; // Import the Sidebar component
import BottomSidebar from './components/sidebar/BottomSidebar';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import MapBox from './components/Map/MapBox';
import MapComponent from './components/Map/MapComponent';

function App() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <ThemeProvider> {/* Wrap your entire app with ThemeProvider */}
      <ToastContainer /> {/* Render ToastContainer at the root level */}
      <AppContent isSmallScreen={isSmallScreen} />
    </ThemeProvider> 
  );
}

function AppContent({ isSmallScreen }) {
  const { darkMode } = useContext(ThemeContext); // Access the theme context

  const SidebarComponent = isSmallScreen ? BottomSidebar : Sidebar;
  const sidebarWidth = isSmallScreen ? 16 : 64; // Define sidebar width based on screen size

  return (
    <Router>
      <SidebarComponent />
      <div className={`flex-1 justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} ${isSmallScreen ? '' : `pl-${sidebarWidth}`}`}>
        {/* Conditionally apply the 'dark' class based on the theme state */}
        <div className={`absolute top-0 right-0 m-4`}>
          <ThemeToggle /> {/* Use the ThemeToggle component here */}
        </div>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          {/* Add more routes here if needed */}
          <Route path="/map" element={<MapBox />} />
          <Route path="/maptest" element={<MapComponent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
