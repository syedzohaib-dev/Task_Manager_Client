import React from "react";
import { Link } from "react-router-dom";

const ThreeDotModal = ({ openThreeDotModal, setOpenThreeDotModal, onClose, setEditTask, setOpenAddTask }) => {
    if (!openThreeDotModal) return null;

    return (
        <div
            className="absolute top-8 right-2 border border-gray-400 bg-white shadow-lg rounded-md z-50 w-48 px-2 py-3"
            // onClick={(e) => e.stopPropagation()}
        >
            <div className="space-y-2 max-h-80 overflow-y-auto">

                {/* Open Task */}
                <Link
                    to="/dashboard/taskdetail"
                    className="block p-2 text-sm border-b border-gray-200 hover:bg-gray-100 rounded cursor-pointer"
                >
                    Open Task
                </Link>

                {/* Edit */}
                <button
                    onClick={() => {
                        console.log('edit chala')
                        setEditTask(true)
                        setOpenAddTask(true)
                        setOpenThreeDotModal(false)
                    }}
                    type="button"
                    className="block p-2 text-sm border-b border-gray-200 hover:bg-gray-100 rounded cursor-pointer"
                >
                    Edit
                </button>

                {/* Duplicate */}
                <button
                    className="w-full text-left p-2 border-b border-gray-200 text-sm hover:bg-gray-100 rounded"
                    onClick={() => alert("Duplicate Pressed")}
                >
                    Duplicate
                </button>

                {/* Delete */}
                <Link
                    to="#"
                    className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                    Delete
                </Link>
            </div>
        </div>
    );
};

export default ThreeDotModal;
