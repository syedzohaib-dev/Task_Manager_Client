import React from 'react'
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from 'react-router-dom';

const usersData = [
    {
        id: 1,
        fullName: "Ali Khan",
        title: "Senior Developer",
        email: "ali@example.com",
        role: "Admin",
        active: true,
    },
    {
        id: 2,
        fullName: "Sara Ahmed",
        title: "UI/UX Designer",
        email: "sara@example.com",
        role: "Editor",
        active: false,
    },
    {
        id: 3,
        fullName: "Bilal Hussain",
        title: "Project Manager",
        email: "bilal@example.com",
        role: "Manager",
        active: true,
    },
    {
        id: 4,
        fullName: "Hina Rajput",
        title: "QA Engineer",
        email: "hina@example.com",
        role: "QA",
        active: false,
    },
    {
        id: 5,
        fullName: "Usman Tariq",
        title: "Backend Developer",
        email: "usman@example.com",
        role: "Developer",
        active: true,
    },
];

const TeamTable = () => {
    return (
        <>
            <div className="overflow-auto w-full rounded-2xl mt-10 shadow-md">
                <table className="w-full min-w-[800px]">

                    {/* Table Header */}
                    <thead className="bg-gray-200 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Full Name
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Title
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Email
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Role
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Active
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usersData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">

                                <td className="min-w-40 px-6 py-3 text-center">
                                    <span className="text-sm font-medium text-gray-900">
                                        {user.fullName}
                                    </span>
                                </td>

                                <td className="min-w-40 px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user.title}</span>
                                </td>

                                <td className="px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user.email}</span>
                                </td>

                                <td className="px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user.role}</span>
                                </td>

                                <td className="min-w-40 py-3 text-center">
                                    <span
                                        className={`w-20 mx-auto block text-center px-4 rounded-full text-sm ${user.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-3 text-center flex justify-center gap-3">
                                    <Link to="/profile">
                                        <button className="p-2  text-blue-600 rounded-full">
                                            <FiEdit2 size={18} />
                                        </button>
                                    </Link>

                                    <button className="p-2  text-red-600 rounded-full">
                                        <FiTrash2 size={18} />
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default TeamTable;
