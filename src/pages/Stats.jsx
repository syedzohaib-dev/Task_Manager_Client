import React from 'react'
import { FaTasks } from 'react-icons/fa'
import { MdAddTask } from 'react-icons/md'
import { FcProcess } from "react-icons/fc";
import { LuListTodo } from 'react-icons/lu';
import PriorityChart from '../components/PriorityChart.jsx';
import TaskTable from '../components/TaskTable.jsx';
import UserTable from '../components/UserTable.jsx';
import { useTask } from '../context/TaskContext.jsx';


const Stats = ({ role }) => {
    const { stats } = useTask()
    return (
        <div className="h-screen bg-gray-100 p-6 overflow-y-auto hide-scrollbar">
            <div className="max-w-7xl mx-auto">

                <div className="w-full flex flex-wrap md:gap-4 gap-2 mb-8">
                    <div className="md:w-[300px] w-full  rounded-2xl shadow-sm bg-white border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg"><FaTasks /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Total Task</span>
                        </div>
                        <div className="text-3xl font-bold h-10 text-gray-900 mb-2">{stats?.totalTasks?.count}</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-blue-400 bg-gray-100 rounded-md px-1 font-semibold'>{stats?.totalTasks?.change}</span>
                            Last Month
                        </div>
                    </div>

                    <div className="bg-white md:w-[300px] w-full rounded-2xl shadow-sm  border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg"><MdAddTask /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Completed Task</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl h-10 font-bold text-gray-900 mb-2">{stats?.completedTasks?.count}</div>
                                <div className="text-gray-500 text-sm w-full flex gap-2">
                                    <span className='text-green-400 bg-gray-100 rounded-md px-1 font-semibold'>{stats?.completedTasks?.change}</span>
                                    Last Month
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white md:w-[300px] w-full rounded-2xl shadow-sm  border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-lg"><FcProcess /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Task In Process</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2 h-10">{stats?.inProcessTasks?.count}</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-red-400 bg-gray-100 rounded-md px-1 font-semibold'>{stats?.inProcessTasks?.change}</span>
                            Last Month
                        </div>
                    </div>

                    <div className="bg-white md:w-[300px] w-full rounded-2xl shadow-sm  border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg"><LuListTodo /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Todos</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2 h-10">{stats?.todoTasks?.count}</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-green-400 bg-gray-100 rounded-md px-1 font-semibold'>{stats?.todoTasks?.change}</span>
                            Last Month
                        </div>
                    </div>
                </div>

                {/* Table Section */}

            </div>

            <PriorityChart />

            {
                role == 'admin' && <TaskTable />
            }


            {
                role == 'admin' && <UserTable />
            }






        </div>
    )
}

export default Stats