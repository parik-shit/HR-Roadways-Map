import React from "react";

const UpdateTaskModal = ({ updateTaskData, handleInputChange, handleUpdateTask, closeUpdateModal, darkMode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-4">Update Task</h2>
        <input
          type="text"
          name="title"
          value={updateTaskData.title}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={updateTaskData.description}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          name="dueDate"
          value={updateTaskData.dueDate}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Due Date"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-2 rounded"
            onClick={handleUpdateTask}
          >
            Update
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={closeUpdateModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
