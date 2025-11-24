import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const PriorityChart = () => {
    // if (!incomeData || incomeData.length === 0) {
    //     return (
    //         <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto text-center text-gray-500">
    //             <h2 className="text-lg font-semibold mb-4">No Priority Overview</h2>
    //             <p>No data found</p>
    //         </div>
    //     );
    // }

    const taskData = [
        { id: 1, title: "Fix login bug", priority: "High", createdAt: "2025-01-01" },
        { id: 2, title: "Update dashboard UI", priority: "Medium", createdAt: "2025-01-01" },
        { id: 3, title: "Add invoice filters", priority: "High", createdAt: "2025-01-02" },
        { id: 4, title: "Improve API speed", priority: "Low", createdAt: "2025-01-02" },
        { id: 5, title: "Create team module", priority: "High", createdAt: "2025-01-03" },
        { id: 6, title: "Add pagination", priority: "Medium", createdAt: "2025-01-03" },
    ];



    // Grouping by date
    const grouped = taskData.reduce((acc, task) => {
        const date = new Date(task.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });

        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    // Convert to chart format
    const data = Object.keys(grouped).map((date) => ({
        date: date,
        amount: grouped[date],
    }));



    return (
        <div className="bg-white p-6 my-6 h-130 border rounded-2xl shadow-md w-full mx-auto">
            <div className="h-130 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriorityChart;