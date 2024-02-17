import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext"; // Import the ThemeContext
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = () => {
  const navigate = useNavigate();
  const { darkMode} = useContext(ThemeContext); // Access darkMode state and toggle function from the context

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", formData);
      navigate("/"); // Redirect to the home page after successful form submission
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-8 shadow-md rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Add New Task</h2>
          
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-200 text-gray-800 placeholder-gray-600'}`}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-200 text-gray-800 placeholder-gray-600'}`}
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-200 text-gray-800 placeholder-gray-600'}`}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskForm;
