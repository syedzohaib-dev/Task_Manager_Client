import React, { useState } from "react";
import { useTask } from "../context/TaskContext.jsx";
import { errorToast } from "../utils/toast.js";
import { useUser } from "../context/UserContext.jsx";

const AddSubTaskModal = ({ openAddSubTask, onClose, task }) => {
    if (!openAddSubTask) return null;
    const { addSubTaskHandler, getAllTask } = useTask()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        taskTitle: "",
        taskDate: "",
        tag: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const errors = {};

        if (!formData.taskTitle) errors.taskTitle = "Title is Required";
        if (!formData.taskDate) errors.taskDate = "Date is Required";
        if (!formData.tag) errors.tag = "Tag is Required";
        return errors
    };

    const handleAddTask = async (task) => {
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            await addSubTaskHandler(task._id, formData);
            console.log(formData);
            onClose();
            getAllTask()
        } catch (error) {
            errorToast("Failed to Add Sub task");
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            {/* Modal Box */}
            <div className="bg-white w-[90%] md:w-[500px] rounded-lg p-6 shadow-xl">

                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add Sub Task</h2>

                <div className="flex flex-col gap-4">

                    {/* Task Title */}
                    <div>
                        <label className="text-sm font-medium">Task Title</label>
                        <input
                            type="text"
                            name="taskTitle"
                            value={formData.taskTitle}
                            onChange={handleChange}
                            placeholder="Work Done"
                            className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400  hover:border-blue-800 focus:border-blue-800"
                        />
                        <div className="h-5">
                            {errors.taskTitle && (
                                <p className="text-red-600 text-xs">{errors.taskTitle}</p>
                            )}
                        </div>
                    </div>

                    {/* Assign Task To */}

                    {/* Task Stage + Task Date */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label className="text-sm font-medium">Task Date</label>
                            <input
                                type="date"
                                name="taskDate"
                                value={formData.taskDate}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                            />
                            <div className="h-5">
                                {errors.taskDate && (
                                    <p className="text-red-600 text-xs">{errors.taskDate}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium">Tag</label>
                            <input
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                                placeholder="Some Tag"
                            />
                            <div className="h-5">
                                {errors.tag && (
                                    <p className="text-red-600 text-xs">{errors.tag}</p>
                                )}
                            </div>
                        </div>
                    </div>


                </div>

                {/* Buttons */}
                <div className="w-full flex justify-center gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleAddTask(task)}
                        className="w-full px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-900"
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddSubTaskModal;
