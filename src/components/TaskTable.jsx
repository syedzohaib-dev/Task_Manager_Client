import React from 'react'
import { useTask } from '../context/TaskContext.jsx';

const TaskTable = () => {
    const { allTask } = useTask()

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800 border border-red-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300";
            case "normal":
                return "bg-blue-100 text-blue-800 border border-blue-300";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-300";
        }
    };


    return (
        <>
            <div className="overflow-auto rounded-2xl mt-15 shadow-md" >
                <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-200 border-b border-gray-200 rounded-ms">
                        <tr>
                            <th className="px-6 py-4 text-left text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Task Title
                            </th>
                            <th className="px-6 py-4 text-left text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Priority
                            </th>
                            <th className="px-6 py-4 text-left text-md font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-1">
                                Team
                            </th>
                            <th className="px-6 py-4 text-left text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Created At
                            </th>

                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {allTask?.map((task, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-2">
                                    <div className="text-sm font-medium text-gray-900">{task.taskTitle}</div>
                                </td>
                                <td className="px-6 py-2">
                                    {/* <div className="text-sm font-medium text-gray-900">{task.priorityLevel}</div> */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priorityLevel)}`}
                                    >
                                        {task.priorityLevel}
                                    </span>
                                </td>
                                <td className="px-6 py-2">
                                    <div className="min-w-[100px] flex gap-2">{task?.assignTaskTo.map((member, index) => (
                                        <img
                                            key={index}
                                            src={member?.userId?.profileImgURL}
                                            alt={member.fullName}
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md shadow-gray-500"
                                        />
                                    ))}</div>
                                </td>
                                <td className="px-6 py-2">
                                    <div className="text-sm font-medium text-gray-900 min-w-[100px]">{new Date(task.createdAt).toLocaleDateString('en-pk')}</div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default TaskTable