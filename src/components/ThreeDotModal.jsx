import React from "react";
import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext.jsx";
import { errorToast, successToast } from "../utils/toast.js";
import { FaLockOpen, FaRegTrashAlt } from "react-icons/fa";
import { TbRestore } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdMoveDown, MdMoveUp } from "react-icons/md";
import { useUser } from "../context/UserContext.jsx";


const ThreeDotModal = ({ openThreeDotModal, setOpenThreeDotModal, onClose, setEditTask, setOpenAddTask, task, isTrashMode, setOpenAddSubTask }) => {
    if (!openThreeDotModal) return null;

    const { moveToTrash, restoreFromTrash, deleteTaskHandler, duplicateTaskHandler } = useTask();
    const { user } = useUser()

    const handleTrash = async () => {
        const confirmDelete = window.confirm("Are you sure you want to move this task to trash?");

        if (confirmDelete) {
            try {
                await moveToTrash(task._id);
                setOpenThreeDotModal(false);
                successToast("Task moved to trash successfully!");
            } catch (error) {
                errorToast("Failed to move task to trash");
                console.error(error);
            }
        }
    };

    const handleRestoreTrash = async () => {
        const confirmDelete = window.confirm("Are you sure you want to remove this task to trash?");

        if (confirmDelete) {
            try {
                await restoreFromTrash(task._id);
                setOpenThreeDotModal(false);
                successToast("Task restore From trash successfully!");
            } catch (error) {
                errorToast("Failed to restore task to trash");
                console.error(error);
            }
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
            try {
                await deleteTaskHandler(task._id);
                successToast("Task delete successfully!");
                setOpenThreeDotModal(false);
            } catch (error) {
                errorToast("Failed to delete task");
                console.error(error);
            }
        }
    };


    const handleDuplicate = async () => {
        const confirmDuplicate = window.confirm("Are you sure you want to duplicate this task?");

        if (confirmDuplicate) {
            try {
                await duplicateTaskHandler(task._id);
                successToast("Task duplicate successfully!");
                setOpenThreeDotModal(false);
            } catch (error) {
                errorToast("Failed to duplicate task");
                console.error(error);
            }
        }
    };


    if (user?.role !== "admin") {
        return (
            <div className="absolute top-8 right-2 border border-gray-400 bg-white shadow-lg rounded-md z-50 w-48 px-2 py-3">
                <Link
                    to={`/dashboard/taskdetail/${task._id}`}
                    className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                >
                    <FaLockOpen size={15} />
                    Open Task
                </Link>
            </div>
        );
    }


    return (
        <div
            className="absolute top-8 right-2 border border-gray-400 bg-white shadow-lg rounded-md z-50 w-48 px-2 py-3"
        // onClick={(e) => e.stopPropagation()}
        >
            {
                !isTrashMode ?
                    (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            <Link
                                to={`/dashboard/taskdetail/${task._id}`}
                                className="flex items-center gap-2 p-2 text-sm border-b border-gray-200 hover:bg-gray-100 rounded cursor-pointer"
                            >
                                <FaLockOpen size={15} />
                                Open Task
                            </Link>
                            <button
                                // onClick={() => {
                                //     console.log('edit chala')
                                //     setEditTask(true)
                                //     setOpenAddTask(true)
                                //     setOpenThreeDotModal(false)
                                //     handleEdit
                                // }}
                                onClick={() => {
                                    setEditTask(task);
                                    setOpenAddTask(true);
                                    setOpenThreeDotModal(false);
                                }}
                                type="button"
                                className="flex items-center gap-2 p-2 text-sm border-b border-gray-200 hover:bg-gray-100 rounded cursor-pointer"
                            >
                                <CiEdit size={15} />
                                Edit
                            </button>

                            {/* Duplicate */}
                            <button
                                className="w-full flex items-center gap-2 text-left p-2 border-b border-gray-200 text-sm hover:bg-gray-100 rounded"
                                onClick={() => {
                                    setOpenAddSubTask(true)
                                    setOpenThreeDotModal(false)
                                }}
                            >
                                <IoDuplicateOutline size={15} />
                                Add Sub Task
                            </button>

                            {/* Duplicate */}
                            <button
                                className="w-full flex items-center gap-2 text-left p-2 border-b border-gray-200 text-sm hover:bg-gray-100 rounded"
                                onClick={handleDuplicate}
                            >
                                <IoDuplicateOutline size={15} />
                                Duplicate
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={handleTrash}
                                className="flex items-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                                <MdMoveDown size={15} />
                                Move To Trash
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className="space-y-2 max-h-80 overflow-y-auto">

                            <button
                                type="button"
                                onClick={handleRestoreTrash}
                                className="flex items-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                                <MdMoveUp size={15} />Restore From Trash
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                                <FaRegTrashAlt size={15} /> Delete Permenently
                            </button>
                        </div>
                    )
            }

        </div >
    );
};

export default ThreeDotModal;
