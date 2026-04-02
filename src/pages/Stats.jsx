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

                {/* <div className="w-full flex flex-wrap md:gap-4 gap-2 mb-8">
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
                </div> */}

                <div className="w-full flex flex-wrap gap-7 mb-8">

                    {/* Total Tasks */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-5 flex-1 min-w-[200px] md:max-w-[300px]">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-200 rounded-full " />
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-[34px] h-[34px] bg-blue-50 rounded-xl flex items-center justify-center">
                                <FaTasks className="text-blue-700 text-sm" />
                            </div>
                            <span className="text-gray-500 text-lg font-medium tracking-wide">Total Tasks</span>
                        </div>
                        <div className="text-3xl font-medium text-gray-900 mb-3">{stats?.totalTasks?.count || 0}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 rounded-md px-2 py-0.5">{stats?.totalTasks?.change || 0}</span>
                            <span className="text-md text-gray-400">vs last month</span>
                        </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-5 flex-1 min-w-[200px] md:max-w-[300px]">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-200 rounded-full " />
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-[34px] h-[34px] bg-green-50 rounded-xl flex items-center justify-center">
                                <MdAddTask className="text-green-700 text-sm" />
                            </div>
                            <span className="text-gray-500 text-lg font-medium tracking-wide">Completed</span>
                        </div>
                        <div className="text-3xl font-medium text-gray-900 mb-3">{stats?.completedTasks?.count || 0}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-green-700 bg-green-50 rounded-md px-2 py-0.5">{stats?.completedTasks?.change || 0}</span>
                            <span className="text-md text-gray-400">vs last month</span>
                        </div>
                    </div>

                    {/* In Process */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-5 flex-1 min-w-[200px] md:max-w-[300px]">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-200 rounded-full" />
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-[34px] h-[34px] bg-amber-50 rounded-xl flex items-center justify-center">
                                <FcProcess className="text-amber-700 text-sm" />
                            </div>
                            <span className="text-gray-500 text-lg font-medium tracking-wide">In Process</span>
                        </div>
                        <div className="text-3xl font-medium text-gray-900 mb-3">{stats?.inProcessTasks?.count || 0}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-amber-700 bg-amber-50 rounded-md px-2 py-0.5">{stats?.inProcessTasks?.change || 0}</span>
                            <span className="text-md text-gray-400">vs last month</span>
                        </div>
                    </div>

                    {/* Todos */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-5 flex-1 min-w-[200px] md:max-w-[300px]">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-200 rounded-full" />
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-[34px] h-[34px] bg-purple-50 rounded-xl flex items-center justify-center">
                                <LuListTodo className="text-purple-700 text-sm" />
                            </div>
                            <span className="text-gray-500 text-lg font-medium tracking-wide">Todos</span>
                        </div>
                        <div className="text-3xl font-medium text-gray-900 mb-3">{stats?.todoTasks?.count || 0}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-purple-700 bg-purple-50 rounded-md px-2 py-0.5">{stats?.todoTasks?.change || 0}</span>
                            <span className="text-md text-gray-400">vs last month</span>
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