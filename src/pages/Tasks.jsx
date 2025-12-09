import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import TaskCard from '../components/TaskCard.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import AddSubTaskModal from '../components/AddSubTaskModal.jsx';
import { useOutletContext } from 'react-router-dom';
import { useTask } from '../context/TaskContext.jsx';
import { GrTask } from "react-icons/gr";
import { useUser } from '../context/UserContext.jsx';



const Tasks = () => {
  const { setOpenAddTask, setEditTask, editTask, openAddTask } = useOutletContext();
  const { allTask } = useTask()
  const { user } = useUser()

  const handleEdit = async () => {
    console.log('edit chala')
  }

  return (
    <>
      <AddTaskModal
        openAddTask={openAddTask}
        onClose={() => setOpenAddTask(false)}
        onSubmit={(data) => console.log("Task Added:", data)}
        setEditTask={setEditTask}
        editTask={editTask}
      />

      <div className="h-screen bg-gray-100 p-6 hide-scrolbar overflow-y-auto">


        <div className="w-full flex justify-between px-2">
          <p className="text-2xl">Tasks</p>
          <button
            onClick={() => setOpenAddTask(true)}
            disabled={user?.role !== "admin"}
            type="button"
            // className='bg-blue-800 text-white rounded-md flex justify-center items-center text-md px-2 py-2 gap-1'
            className={`px-4 py-2 rounded flex justify-center items-center gap-1 ${user?.role === "admin" ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            <IoMdAdd className='text-white' />
            Create Task
          </button>
        </div>

        <div className="w-full flex px-2 gap-2 my-2">
          <button type="button" className='h-10 hover:border-blue-800 border-white border-b-2 flex justify-center items-center text-md px-2  gap-1 bg-white hover:text-blue-800'>
            <MdDashboard />
            Board View
          </button>
          {/* <button type="button" className='h-10 hover:border-blue-800 border-white border-b-2 flex justify-center items-center text-md px-2  gap-1 bg-white hover:text-blue-800'>
              <FaList />
              List View
            </button> */}
        </div>


        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">

          {/* To Do */}
          <div className="w-full bg-white rounded-md flex items-center justify-between px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              <p className="text-sm font-semibold text-gray-700">To Do</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center text-lg">
              <GrTask />
            </button>
          </div>

          {/* In Progress */}
          <div className="w-full bg-white rounded-md flex items-center justify-between px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <p className="text-sm font-semibold text-gray-700">In Progress</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center text-lg">
              <GrTask />
            </button>
          </div>

          {/* Completed */}
          <div className="w-full bg-white rounded-md flex items-center justify-between px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
              <p className="text-sm font-semibold text-gray-700">Completed</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center text-lg">
              <GrTask />
            </button>
          </div>

        </div>


        <div className="w-full flex gap-4 my-5 justify-center flex-wrap pb-3">
          {(allTask?.length === 0) && (
            <p className='w-full h-20 m-5 text-center shadow-md px-8 py-5 bg-red-100 text-black text-2xl rounded'>
              No Task Found
            </p>
          )}

          {allTask
            ?.filter((item) => item.isTrashed === false)
            .map((item, index) => (
              <TaskCard
                key={index}
                task={item}
                setEditTask={setEditTask}
                setOpenAddTask={setOpenAddTask}
                handleEdit={handleEdit}
              />
            ))}
        </div>



      </div>
    </>
  )
}

export default Tasks