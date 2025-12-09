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
import { useTask } from "../context/TaskContext.jsx";


const PriorityChart = () => {
    const { allTask } = useTask()
    const high = allTask?.filter(t => t.priorityLevel === "High").length;
    const medium = allTask?.filter(t => t.priorityLevel === "Medium").length;
    const normal = allTask?.filter(t => t.priorityLevel === "Normal").length;

    const data = [
        { name: "High", value: high },
        { name: "Medium", value: medium },
        { name: "Normal", value: normal },
    ];

    return (
        <div className="bg-white p-6 my-6  rounded-2xl shadow-md w-full mx-auto">
            <p className="text-2xl text-gray-600 font-semibold mb-4">Chrt by priority</p>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='value' fill="#193cb8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriorityChart;