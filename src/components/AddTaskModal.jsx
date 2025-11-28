import React, { useState } from "react";

const AddTaskModal = ({ openAddTask, onClose, onSubmit, setEditTask, editTask }) => {
    if (!openAddTask) return null;

    const [formData, setFormData] = useState({
        taskTitle: "",
        assignTaskTo: "",
        taskStage: "",
        taskDate: "",
        priorityLevel: "",
        assets: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.taskTitle.trim()) newErrors.taskTitle = "Title is Required";
        if (!formData.assignTaskTo.trim()) newErrors.assignTaskTo = "Assign Task is Required";
        if (!formData.taskStage.trim()) newErrors.taskStage = "Task Stage is Required";
        if (!formData.taskDate.trim()) newErrors.taskDate = "Task Date Required";
        if (!formData.priorityLevel.trim()) newErrors.priorityLevel = "Priority Level is Required";
        if (!formData.assets) newErrors.assets = "Assets is Required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        onSubmit(formData);
        onClose();
    };

    const handleEdit = () => {
        if (!validate()) return;

        onSubmit(formData);
        onClose();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                {/* Modal Box */}
                <div className="bg-white w-[90%] md:w-[500px] rounded-lg p-6 shadow-xl">

                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        {editTask ? 'Edit Task' : 'Add Task'}
                    </h2>

                    <div className="flex flex-col gap-4">

                        {/* Task Title */}
                        <div>
                            <label className="text-sm font-medium">Task Title</label>
                            <input
                                type="text"
                                name="taskTitle"
                                value={formData.taskTitle}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400  hover:border-blue-800 focus:border-blue-800"
                            />
                            <div className="h-5">
                                {errors.taskTitle && (
                                    <p className="text-red-600 text-xs">{errors.taskTitle}</p>
                                )}
                            </div>
                        </div>

                        {/* Assign Task To */}
                        <div>
                            <label className="text-sm font-medium">Assign Task To</label>
                            <input
                                type="text"
                                name="assignTaskTo"
                                value={formData.assignTaskTo}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                            />
                            <div className="h-5">

                                {errors.assignTaskTo && (
                                    <p className="text-red-600 text-xs">{errors.assignTaskTo}</p>
                                )}
                            </div>
                        </div>

                        {/* Task Stage + Task Date */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="text-sm font-medium">Task Stage</label>
                                <select
                                    name="taskStage"
                                    value={formData.taskStage}
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                                >
                                    <option value="">Select</option>
                                    <option value="todo">To Do</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <div className="h-5">
                                    {errors.taskStage && (
                                        <p className="text-red-600 text-xs">{errors.taskStage}</p>
                                    )}
                                </div>
                            </div>

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
                        </div>



                        {/* Add Asset + Upload */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="text-sm font-medium">Priority Level</label>
                                <select
                                    name="priorityLevel"
                                    value={formData.priorityLevel}
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                                >
                                    <option value="">Select</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Normal">Normal</option>
                                </select>
                                <div className="h-5">
                                    {errors.priorityLevel && (
                                        <p className="text-red-600 text-xs">{errors.priorityLevel}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="text-sm font-medium">Add Assets</label>
                                <input
                                    type="file"
                                    name="assets"
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 border-gray-400 cursor-pointer hover:border-blue-800"
                                />
                                <div className="h-5">
                                    {errors.priorityLevel && (
                                        <p className="text-red-600 text-xs">{errors.assets}</p>
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

                        {
                            editTask ?
                                (<button
                                    onClick={handleEdit}
                                    className="w-full px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-900"
                                >
                                    Update Task
                                </button>)
                                :
                                (<button
                                    onClick={handleSubmit}
                                    className="w-full px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-900"
                                >
                                    Submit
                                </button>)
                        }

                    </div>

                </div>
            </div>
        </>
    );
};

export default AddTaskModal;
