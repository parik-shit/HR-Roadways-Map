import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/sidebar/Sidebar';
import BottomSidebar from './components/sidebar/BottomSidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
// import MapBox from './components/Map/MapBox';
import MapComponent from './components/Map/MapComponent';
import MapPage from './components/Map/MapPage';
import { SizeProvider, SizeContext } from './SizeProvider'; // Import SizeProvider and SizeContext

function App() {
  return (
    <SizeProvider> {/* Wrap your entire app with SizeProvider */}
      <ThemeProvider>
        <ToastContainer />
        <AppContent />
      </ThemeProvider> 
    </SizeProvider>
  );
}

function AppContent() {
  const { darkMode } = useContext(ThemeContext); // Access the theme context
  const { isSmallScreen } = useContext(SizeContext); // Access the size context

  const SidebarComponent = isSmallScreen ? BottomSidebar : Sidebar;
  const sidebarWidth = isSmallScreen ? 16 : 64; // Define sidebar width based on screen size

  return (
    <Router>
      <SidebarComponent />
      <div className={`flex-1 justify-center items-center min-h-screen  ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} ${isSmallScreen ? '' : `pl-${sidebarWidth}`}`}>
        <div className={`absolute top-0 right-0 m-4`}>
          <ThemeToggle /> 
        </div>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/add" element={<TaskForm />} />
          {/* Add more routes here if needed */}
          <Route path="/map" element={<MapPage />} />
          <Route path="/maptest" element={<MapComponent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
