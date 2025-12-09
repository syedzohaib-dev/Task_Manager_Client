import React, { useEffect, useState } from "react";
import { errorToast } from "../utils/toast.js";
import { useUser } from "../context/UserContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPath.js";
import { useTask } from "../context/TaskContext.jsx";
import toast from "react-hot-toast";
import { useNotification } from "../context/NotificationContext.jsx";

const AddTaskModal = ({ openAddTask, onClose, onSubmit, setEditTask, editTask }) => {
    if (!openAddTask) return null;
    const { allUser } = useUser()
    const { getAllTask } = useTask()
    const [uploadProgress, setUploadProgress] = useState(0);
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false);
    const { user } = useUser()
    const { createNotification } = useNotification()


    const [formData, setFormData] = useState({
        taskTitle: "",
        assignTaskTo: [],
        taskStage: "",
        taskData: "",
        priorityLevel: "",
        assetsFile: null,
        taskDesc: "",
        tag: ""
    });
    useEffect(() => {
        if (editTask && allUser.length > 0) {

            const normalizedAssign = editTask.assignTaskTo.map(item => {
                const matched = allUser.find(u => u._id === item.userId || u._id === item._id);

                return {
                    // // userId: matched?._id,
                    // userId: matched?._id || item.userId || item._id,
                    // fullName: matched?.fullName || item.fullName,
                    // title: matched?.title || item.title,
                    // profileImgURL: matched?.profileImgURL || item.profileImgURL
                    // userId: matched?._id || item.userId || item._id,
                    userId:
                        matched?._id ||
                        item.userId?._id ||   // nested case
                        item.userId ||        // plain string
                        item._id
                };
            });


            setFormData((prev) => {
                console.log("Normalized Assign:", normalizedAssign);
                return {
                    taskTitle: editTask.taskTitle,
                    assignTaskTo: normalizedAssign,
                    taskStage: editTask.taskStage,
                    taskData: editTask.taskData,
                    priorityLevel: editTask.priorityLevel,
                    assetsFile: editTask.assetsFile,
                    taskDesc: editTask.taskDesc,
                    tag: editTask.tag
                }
            });
        }
    }, [editTask, allUser]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files, multiple, options } = e.target;
        if (multiple) {
            const selectedValues = Array.from(options)
                .filter((opt) => opt.selected)
                .map((opt) => opt.value);

            setFormData({
                ...formData,
                [name]: selectedValues,
            });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.taskTitle) errors.taskTitle = "Title is Required";
        if (!formData.assignTaskTo.length) errors.assignTaskTo = "Assign Task is Required";
        if (!formData.taskStage) errors.taskStage = "Task Stage is Required";
        if (!formData.taskData) errors.taskData = "Task Date Required";
        if (!formData.priorityLevel) errors.priorityLevel = "Priority Level is Required";
        if (!formData.taskDesc) errors.taskDesc = "Task Desc is Required";
        if (!formData.tag) errors.tag = "Tag is Required";
        if (!formData.assetsFile) errors.assets = "Assets is Required";

        return errors;
    };

    const uploadAssets = async (file) => {
        if (!file) return null;
        setLoading(true)

        const data = new FormData();
        data.append("image", file);
        data.append("upload_preset", "YOUR_UPLOAD_PRESET");  // yahan apna preset lagao


        try {
            const res = await axiosInstance.post(
                `${API_PATHS.TASK.UPLOAD_ASSETS}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(percent)
                        setUploadProgress(percent)
                    }
                },
            );
            console.log("Uploaded:", res?.data);
            return res.data.data;

        } catch (err) {
            console.log("Asset Upload Error:", err);
            errorToast("File upload failed");
            return null;
        } finally {
            setLoading(false)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        if (user.role !== "admin") {
            toast.error('You are not allowed to perform this action You are not admin')
            return
        }
        if (loading) return;
        setLoading(true);
        let uploadedUrl = null;
        if (formData.assetsFile) {
            setUploadProgress(0);
            uploadedUrl = await uploadAssets(formData.assetsFile);
        }
        const payload = {
            ...formData,
            assignTaskTo: formData.assignTaskTo.map(user => ({
                userId: user.userId,
            })),
            assetsFile: uploadedUrl
        };
        setUploadProgress(0);
        if (loading) return;
        setLoading(true);

        try {
            let res;

            if (editTask) {
                res = await axiosInstance.put(
                    `${API_PATHS.TASK.EDIT_TASK}/${editTask._id}`,
                    payload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                res = await axiosInstance.post(
                    API_PATHS.TASK.ADD_TASK,
                    payload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            if (!editTask) {
                await createNotification(res?.data?.data?._id, res?.data?.data?.assignTaskTo)
            }

            setFormData({
                taskTitle: "",
                assignTaskTo: [],
                taskStage: "",
                taskData: "",
                priorityLevel: "",
                assetsFile: null,
                taskDesc: "",
                tag: ""
            });

            onClose()
            getAllTask()

        } catch (err) {
            console.log("Signup Error:", err);

            const message =
                err.response?.data?.message || "Signup failed. Try again.";

            errorToast(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 ">

                {/* Modal Box */}
                <div className="bg-white w-[90%] md:w-[700px] rounded-lg p-6 shadow-xl">

                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        {editTask ? 'Update Task' : 'Add Task'}
                    </h2>

                    <div className="flex flex-col">

                        {/* Task Title */}
                        <div className="flex flex-col md:flex-row gap-4">

                            <div className="w-full">
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

                            <div className="w-full">
                                <label className="text-sm font-medium">Task Tag</label>
                                <input
                                    type="text"
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400  hover:border-blue-800 focus:border-blue-800"
                                />
                                <div className="h-5">
                                    {errors.tag && (
                                        <p className="text-red-600 text-xs">{errors.tag}</p>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div>
                            <label className="text-sm font-medium">Task Description</label>
                            <input
                                type="text"
                                name="taskDesc"
                                value={formData.taskDesc}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400  hover:border-blue-800 focus:border-blue-800"
                            />
                            <div className="h-5">
                                {errors.taskDesc && (
                                    <p className="text-red-600 text-xs">{errors.taskDesc}</p>
                                )}
                            </div>
                        </div>

                        {/* Assign Task To */}
                        <div className="w-full border rounded-md p-2 max-h-40 overflow-y-auto outline-none
                                 border-gray-400  hover:border-blue-800 hide-scrollbar">
                            {allUser.map((user) => (
                                <label
                                    key={user._id}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.assignTaskTo.some(u => u.userId === user._id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                if (!formData.assignTaskTo.some(u => u.userId === user._id)) {
                                                    setFormData({
                                                        ...formData,
                                                        assignTaskTo: [...formData.assignTaskTo, { userId: user._id }]
                                                    });
                                                }
                                            } else {
                                                setFormData({
                                                    ...formData,
                                                    assignTaskTo: formData.assignTaskTo.filter(
                                                        (u) => u.userId !== user._id
                                                    )
                                                });
                                            }
                                        }}
                                    />

                                    <span className="w-full flex gap-2">
                                        <img className="w-5 h-5 rounded-full" src={user.profileImgURL} alt="profile image" />
                                        {user.fullName} -- {user.title}</span>
                                </label>
                            ))}



                            <div className="h-5">
                                {errors.assignTaskTo && (
                                    <p className="text-red-600 text-xs">{errors.assignTaskTo}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="text-sm font-medium">Task Stage</label>
                                <select
                                    name="taskStage"
                                    value={formData.taskStage}
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="ToDo">ToDo</option>
                                    <option value="InProgress">InProgress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <div className="h-5">
                                    {errors.taskStage && (
                                        <p className="text-red-600 text-xs">{errors.taskStage}</p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="text-sm font-medium">Task Data</label>
                                <input
                                    type="text"
                                    name="taskData"
                                    value={formData.taskData}
                                    onChange={handleChange}
                                    className="w-full mt-1 border rounded-md p-2 outline-none border-gray-400 hover:border-blue-800 focus:border-blue-800"
                                />
                                <div className="h-5">
                                    {errors.taskData && (
                                        <p className="text-red-600 text-xs">{errors.taskData}</p>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                <div className="w-full mt-1 flex gap-2 items-center ">
                                    <input
                                        type="file"
                                        name="assetsFile"
                                        onChange={(e) => setFormData({ ...formData, assetsFile: e.target.files[0] })}
                                        className="w-full border rounded-md p-2 border-gray-400 cursor-pointer hover:border-blue-800"
                                    />
                                    {editTask && editTask.assetsFile && (
                                        <div className="">
                                            <img
                                                src={editTask.assetsFile}
                                                alt="Old Asset"
                                                className="w-10 h-10 object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="h-5 mt-1">
                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <p className="text-blue-800 text-sm">
                                            Uploading... {uploadProgress}%
                                        </p>
                                    )}

                                    {uploadProgress === 100 && (
                                        <p className="text-green-600 text-sm">
                                            Upload complete
                                        </p>
                                    )}
                                </div>
                                <div className="h-5">
                                    {errors.assetsFile && (
                                        <p className="text-red-600 text-xs">{errors.assetsFile}</p>
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
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-900">
                            {loading
                                ? editTask
                                    ? "Updating..."
                                    : "Adding..."
                                : editTask
                                    ? "Update Task"
                                    : "Add Task"}
                        </button>
                    </div>

                </div>
            </div >
        </>
    );
};

export default AddTaskModal;
