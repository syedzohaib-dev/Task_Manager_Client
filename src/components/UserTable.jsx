import React, { useState } from 'react'

const UserTable = () => {

    const usersData = [
        {
            id: 1,
            fullName: "Zohaib Akhter",
            status: "Active",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
            createdAt: "2025-01-01",
        },
        {
            id: 2,
            fullName: "Muhammad Sufiyan",
            status: "Inactive",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s",
            createdAt: "2025-01-02",
        },
        {
            id: 3,
            fullName: "Ali Raza",
            status: "Active",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            createdAt: "2025-01-03",
        },
        {
            id: 4,
            fullName: "Hassan Ahmed",
            status: "Inactive",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s",
            createdAt: "2025-01-04",
        },
        {
            id: 5,
            fullName: "Sana Tariq",
            status: "Active",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            createdAt: "2025-01-05",
        },
    ];


    return (
        <>

            <div className="overflow-auto rounded-2xl mt-15 shadow-md mb-10" >
                <table className="w-full w-[600px]">
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
                        {usersData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                {/* User Info Column */}
                                <td className="px-6 py-2 text-center">
                                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                </td>
                                <td className="px-6 py-2 text-center flex justify-center">
                                    <span
                                        className={` w-20 text-center text-sm shadow-sm py-1 rounded-full block
                                             ${user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="px-6 py-2 text-center">
                                    <div className="text-sm font-medium text-gray-900 min-w-[100px]">{user.createdAt}</div>
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