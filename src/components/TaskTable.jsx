import React from 'react'

const TaskTable = () => {

    const usersData = [
        {
            id: 1,
            title: "Fix login bug",
            priority: "High",
            team: [
                { name: "Zohaib", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" },
                { name: "Sufiyan", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" },
            ],
            createdAt: "2025-01-01",
        },
        {
            id: 2,
            title: "Update dashboard UI",
            priority: "Medium",
            team: [
                { name: "Ali", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" },
                { name: "Ahsan", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
                { name: "Sana", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            ],
            createdAt: "2025-01-02",
        },
        {
            id: 3,
            title: "API integration for tasks",
            priority: "Normal",
            team: [
                { name: "Hassan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
            ],
            createdAt: "2025-01-03",
        },
        {
            id: 4,
            title: "Create team module",
            priority: "High",
            team: [
                { name: "Bilal", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
                { name: "Hamza", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
            ],
            createdAt: "2025-01-04",
        },
        {
            id: 5,
            title: "Add pagination",
            priority: "Medium",
            team: [
                { name: "Sufiyan", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s" },
            ],
            createdAt: "2025-01-05",
        },
    ];


    return (
        <>
            <div className="overflow-auto rounded-2xl mt-15 shadow-md" >
                <table className="w-full min-w-[600px]">
                    {/* Table Header */}
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

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {usersData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                {/* User Info Column */}
                                <td className="px-6 py-2">
                                    <div className="text-sm font-medium text-gray-900">{user.title}</div>
                                </td>
                                <td className="px-6 py-2">
                                    <div className="text-sm font-medium text-gray-900">{user.priority}</div>
                                </td>
                                <td className="px-6 py-2">
                                    <div className="min-w-[100px] flex gap-2">{user.team.map((member, idx) => (
                                        <img
                                            key={idx}
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md shadow-gray-500"
                                        />
                                    ))}</div>
                                </td>
                                <td className="px-6 py-2">
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

export default TaskTable