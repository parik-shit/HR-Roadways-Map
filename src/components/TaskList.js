import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import UpdateTaskModal from "./UpdateTaskModal";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash } from "@phosphor-icons/react";

function TaskList() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [updateTaskData, setUpdateTaskData] = useState({
    taskId: null,
    title: "",
    description: "",
    dueDate: "",
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const onAdd = () => {
    navigate("/add");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error here
        setLoading(false); // Ensure loading state is set to false even if there's an error
      }
    };
    fetchTasks();
  }, []);

  const handleUpdateTask = async () => {
    try {
      await axios.put(`/api/tasks/${updateTaskData.taskId}`, {
        title: updateTaskData.title,
        description: updateTaskData.description,
        dueDate: updateTaskData.dueDate,
      });
      closeUpdateModal();
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleInputChange = (e) => {
    setUpdateTaskData({ ...updateTaskData, [e.target.name]: e.target.value });
  };

  const openUpdateModal = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.TaskId === taskId);
    setUpdateTaskData({
      taskId: taskId,
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      dueDate: taskToUpdate.dueDate,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateTaskData({
      taskId: null,
      title: "",
      description: "",
      dueDate: "",
    });
    setIsUpdateModalOpen(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTimeout(() => {
        setTasks(tasks.filter((task) => task.TaskId !== taskId));
        toast(<div style={{ display: 'flex', alignItems: 'center' }}>
        <Trash style={{ marginRight: '0.5rem' }} /> Task deleted successfully
      </div>, {
        transition: Bounce,
        position: 'top-center'
      });
      }, 300);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
    return (
      <div className={`container mx-auto px-4 py-8 `} style={{ maxWidth: "800px" }}>
        <ToastContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <div>
            <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onAdd}>
              Add Task
            </button>
          </div>
        </div>
        {loading ? (
  <SkeletonLoader />
) : tasks.length === 0 ? (
  <div>Error fetching</div>
) : (
  <ul>
    {/* {tasks.map((task) => (
      <li
        key={task.TaskId}
        className={`rounded-md shadow-md p-4 mb-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        <div className="font-semibold mb-2">{task.title}</div>
        <div className="text-gray-700 mb-2">{task.description}</div>
        <div className="text-gray-500 mb-2">{task.dueDate}</div>
        <div className="flex mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-2 rounded" onClick={() => openUpdateModal(task.TaskId)}>
            Update
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={() => handleDeleteTask(task.TaskId)}>
            Delete
          </button>
        </div>
      </li>
    ))} */}
  </ul>
)}
        {isUpdateModalOpen && (
          <UpdateTaskModal
            updateTaskData={updateTaskData}
            handleInputChange={handleInputChange}
            handleUpdateTask={handleUpdateTask}
            closeUpdateModal={closeUpdateModal}
            darkMode={darkMode}
          />
        )}
      </div>
    );
    
}

export default TaskList;
