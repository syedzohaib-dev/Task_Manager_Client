import React, { useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FiPaperclip, FiTag } from 'react-icons/fi'
import { useTask } from '../context/TaskContext';
import TaskStatusButtons from './TaskStatusButtons.jsx';

const TaskDetailDiv = ({ task }) => {
    const [commentText, setCommentText] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const { addComment } = useTask();

    const handleAddComment = async () => {
        if (!commentText.trim()) {
            alert("Please enter a comment");
            return;
        }

        setAddingComment(true);
        try {
            await addComment(task._id, commentText);
            setCommentText("");
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setAddingComment(false);
        }
    };
    return (
        <>

            <div className="w-full mx-auto bg-white p-6 md:p-8 rounded-lg shadow mb-10">
                <TaskStatusButtons task={task} />
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {task.taskTitle}
                </h1>
                <p className="text-gray-600 mb-4">{task.taskDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Task Stage
                        </p>
                        <p className="text-lg font-semibold text-gray-800">{task.taskStage}</p>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Priority
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            {task.priorityLevel}
                        </p>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Task Date
                        </p>
                        <div className="flex items-center gap-2 text-gray-800 font-medium">
                            <FaRegCalendarAlt className="text-gray-600" />
                            {new Date(task.createdAt).toLocaleString('en-pk')}
                        </div>
                    </div>

                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Assigned To
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {task.assignTaskTo.map((u, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                    {u.userId?.fullName} -- {u.userId?.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tags */}

                <div className="mb-6">

                    <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
                        Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {task.tag?.split(' ').map((tag, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                            >
                                <FiTag /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
                        Attachments
                    </p>
                    <div className="space-y-2">
                        {task.assetsFile ? (
                            <div className="bg-gray-50 p-3 rounded-md border border-gray-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiPaperclip />
                                    <p className="text-sm font-medium">Task Image</p>
                                </div>
                                <img
                                    src={task.assetsFile}
                                    alt="Task attachment"
                                    className="w-full max-w-md h-auto rounded-md border border-gray-200"
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No attachments</p>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Sub Tasks
                    </h2>

                    {task.subTasks && task.subTasks.length > 0 ? (
                        <div className="space-y-3">
                            {task.subTasks.map((sub, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-300 p-4 rounded-lg bg-gray-50"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-md font-semibold text-gray-800">
                                            {sub.taskTitle}
                                        </h3>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium 
                                          ${sub.isCompleted ?
                                                    "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
                                        >
                                            {sub.isCompleted ? "Completed" : "Pending"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <FiTag className="text-gray-500" />
                                        {sub.tag}
                                    </div>

                                    <div className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Created By: </span>
                                        {sub.createdBy?.fullName ? (
                                            <span>{sub.createdBy?.fullName}</span>
                                        ) : (
                                            <span className="text-gray-500 italic">Unknown</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No sub tasks found</p>
                    )}
                </div>

                {/* Comments */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Comments
                    </h2>
                    <div className='w-full flex px-2 gap-2 justify-between items-center'>
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border border-gray-300 rounded-md p-2 outline-none hover:border-blue-600"
                        />

                        <button
                            type="button"
                            onClick={handleAddComment}
                            disabled={addingComment}
                            className='bg-blue-800 text-white p-2 rounded-md disabled:bg-gray-400'>
                            {addingComment ? "Adding..." : "Add Comment"}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {task.comments?.length > 0 ? (
                            task.comments.map((c, i) => (
                                <div key={i} className="bg-gray-100 p-3 my-3 rounded-md border border-gray-300">
                                    <p className="font-medium text-sm">{c.name}</p>
                                    <p className="text-gray-700 text-sm">{c.desc}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(c.createdAt).toLocaleString('en-pk')}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No comments yet</p>
                        )}
                    </div>
                </div>


            </div>
        </>
    )
}

export default TaskDetailDiv