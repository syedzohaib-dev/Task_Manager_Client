import React from 'react'
import { FaTasks } from 'react-icons/fa'
import { MdAddTask } from 'react-icons/md'
import { FcProcess } from "react-icons/fc";
import { LuListTodo } from 'react-icons/lu';
import PriorityChart from '../components/PriorityChart';


const Stats = () => {
    return (
        <div className="min-h-screen bg-white p-6 hide-scrolbar">
            <div className="max-w-7xl mx-auto">



                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Total Quotation */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg"><FaTasks /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Total Task</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">9</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-blue-400 bg-gray-100 rounded-md px-1 font-semibold'>+0%</span>
                            Last Month
                        </div>
                    </div>

                    {/* Approved */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg"><MdAddTask /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Completed Task</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">1</div>
                                <div className="text-gray-500 text-sm w-full flex gap-2">
                                    <span className='text-green-400 bg-gray-100 rounded-md px-1 font-semibold'>+0%</span>
                                    Last Month
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-lg"><FcProcess /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Task In Process</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-red-400 bg-gray-100 rounded-md px-1 font-semibold'>+0%</span>
                            Last Month
                        </div>
                    </div>

                    {/* Reject */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg"><LuListTodo /></span>
                            </div>
                            <span className="text-gray-600 text-[1.2rem] font-bold">Todos</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
                        <div className="text-gray-500 text-sm w-full flex gap-2">
                            <span className='text-green-400 bg-gray-100 rounded-md px-1 font-semibold'>+0%</span>
                            Last Month
                        </div>
                    </div>
                </div>

                {/* Table Section */}

            </div>

            <PriorityChart />




        </div>
    )
}

export default Stats