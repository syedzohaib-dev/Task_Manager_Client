import React, { useState } from "react";

const AddSubTaskModal = ({ openAddSubTask, onClose }) => {
    if (!openAddSubTask) return null;

    const [formData, setFormData] = useState({
        taskTitle: "",
        taskDate: "",
        tag: ''
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
        if (!formData.taskDate.trim()) newErrors.taskDate = "Date is Required";
        if (!formData.tag) newErrors.tag = "Tag is Required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const addSubTaskHandler = () => {
        if (!validate()) return;

        console.log(formData);
        onClose();
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
                        onClick={addSubTaskHandler}
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
