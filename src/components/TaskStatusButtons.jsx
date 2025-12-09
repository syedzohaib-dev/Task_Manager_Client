import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useTask } from "../context/TaskContext";

const TaskStatusButtons = ({ task }) => {
    const [status, setStatus] = useState(task.status);
    const [loading, setLoading] = useState(false);
    const { changeTaskStatus } = useTask()

    const updateStatus = async (task, taskStage) => {
        if (loading) return;
        setLoading(true);


        try {
            await changeTaskStatus(task._id, { taskStage: taskStage })
            setStatus(taskStage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getButtonStyle = (btnStatus) => {
        if (btnStatus === status) {
            return "bg-blue-600 text-white border-blue-600 cursor-default";
        }

        return "bg-gray-100 text-gray-600 border-gray-300 hover:bg-green-100 hover:border-green-400 hover:text-green-600";
    };

    return (
        <div className="flex gap-2 mt-2 w-full justify-center">
            <button
                onClick={() => updateStatus(task, 'ToDo')}
                disabled={loading}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200`}
            >
                ToDO
            </button>


            <button
                onClick={() => updateStatus(task, 'InProcess')}
                disabled={loading}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200`}
            >
                InProcess
            </button>

            <button
                onClick={() => updateStatus(task, 'Completed')}
                disabled={loading}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200`}
            >
                Completed
            </button>
        </div>
    );
};

export default TaskStatusButtons;
