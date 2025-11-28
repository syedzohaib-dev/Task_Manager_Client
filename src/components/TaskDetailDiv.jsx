import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FiPaperclip, FiTag } from 'react-icons/fi'

const TaskDetailDiv = ({ data }) => {
    return (
        <>
            <div className="w-full mx-auto bg-white p-6 md:p-8 rounded-lg shadow">

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {data.title}
                </h1>
                <p className="text-gray-600 mb-4">{data.description}</p>

                {/* Grid Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    {/* Stage */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Task Stage
                        </p>
                        <p className="text-lg font-semibold text-gray-800">{data.stage}</p>
                    </div>

                    {/* Priority */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Priority
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            {data.priority}
                        </p>
                    </div>

                    {/* Date */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Task Date
                        </p>
                        <div className="flex items-center gap-2 text-gray-800 font-medium">
                            <FaRegCalendarAlt className="text-gray-600" />
                            {data.date}
                        </div>
                    </div>

                    {/* Assigned To */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            Assigned To
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data.assignTo.map((u, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                    {u}
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
                        {data.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                            >
                                <FiTag /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Attachments */}
                <div className="mb-6">
                    <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
                        Attachments
                    </p>
                    <div className="space-y-2">
                        {data.attachments.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-300"
                            >
                                <div className="flex items-center gap-2">
                                    <FiPaperclip />
                                    <p className="text-sm">{f.name}</p>
                                </div>
                                <p className="text-xs text-gray-500">{f.size}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comments */}
                <div className="mb-6">
                    <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
                        Comments
                    </p>

                    <div className="space-y-3">
                        {data.comments.map((c, i) => (
                            <div key={i} className="bg-gray-50 p-3 rounded-md border border-gray-300">
                                <p className="font-medium text-sm">{c.user}</p>
                                <p className="text-gray-700 text-sm">{c.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    )
}

export default TaskDetailDiv