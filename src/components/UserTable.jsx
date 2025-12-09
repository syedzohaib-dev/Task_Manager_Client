import React, { useState } from 'react'
import { useUser } from '../context/UserContext.jsx';

const UserTable = () => {
    const { allUser } = useUser()

  

    return (
        <>

            <div className="overflow-auto rounded-2xl mt-15 shadow-md mb-10" >
                <table className="w-full">
                    {/* Table Header */}
                    <thead className="bg-gray-200 border-b border-gray-200 rounded-ms">
                        <tr>
                            <th className="min-w-50 px-6 py-4 text-center text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th className="px-6 py-4 text-center text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-md font-semibold text-gray-900 uppercase tracking-wider">
                                Created At
                            </th>

                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {allUser.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                {/* User Info Column */}
                                <td className="px-6 py-2 text-center">
                                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                </td>
                                <td className="px-6 py-2 text-center flex justify-center">
                                    <span
                                        className={` w-20 text-center text-sm shadow-sm py-1 rounded-full block
                                             ${user?.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user?.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                <td className="px-6 py-2 text-center">
                                    <div className="text-sm font-medium text-gray-900 min-w-[100px]">{new Date(user.createdAt).toLocaleDateString()}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default UserTable