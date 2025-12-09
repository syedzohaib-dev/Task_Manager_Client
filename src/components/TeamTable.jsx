import React from 'react'
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

const TeamTable = ({ handleEdit }) => {

    const { allUser, deleteUser } = useUser()
    return (
        <>
            <div className="overflow-auto w-full rounded-2xl my-10 shadow-md">
                <table className="w-full min-w-[800px]">

                    {/* Table Header */}
                    <thead className="bg-gray-200 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                Profile
                            </th>
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
                        {allUser.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-2">
                                    <div className="min-w-[50px] flex justify-center gap-2">
                                        <img
                                            src={user?.profileImgURL}
                                            alt={user?.name}
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md shadow-gray-500"
                                        />
                                    </div>
                                </td>
                                <td className="min-w-40 px-6 py-3 text-center">
                                    <span className="text-sm font-medium text-gray-900">
                                        {user?.fullName}
                                    </span>
                                </td>

                                <td className="min-w-40 px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user?.title}</span>
                                </td>

                                <td className="px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user?.email}</span>
                                </td>

                                <td className="px-6 py-3 text-center">
                                    <span className="text-sm text-gray-700">{user.role}</span>
                                </td>

                                <td className="min-w-40 py-3 text-center">
                                    <span
                                        className={`w-20 mx-auto block text-center px-4 rounded-full text-sm ${user.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-3 text-center flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="p-2 text-blue-600 rounded-full">
                                        <FiEdit2 size={18} />
                                    </button>


                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="p-2  text-red-600 rounded-full">
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
