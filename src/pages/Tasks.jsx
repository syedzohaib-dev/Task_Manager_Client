import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import TaskCard from '../components/TaskCard.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import AddSubTaskModal from '../components/AddSubTaskModal.jsx';
import { useOutletContext } from 'react-router-dom';


const Tasks = () => {
  const { setOpenAddTask, setEditTask, editTask, openAddTask } = useOutletContext();

  const tasks = [
    {
      title: "Design Homepage",
      subtitle: "Landing page hero section",
      priority: "High",
      date: "10-Feb-2024",
      status: "todo",                // <---- ADDED
      tags: ["UI/UX", "Frontend", "React"],
      stats: { comments: 5, attachments: 2, subtasks: "2/4" },
      members: [
        { name: "Zohaib", avatar: "/images/user1.jpg" },
        { name: "John", avatar: "/images/user2.jpg" },
      ],
    },
    {
      title: "API Integration",
      subtitle: "Backend connection",
      priority: "Medium",
      date: "12-Feb-2024",
      status: "in-progress",         // <---- ADDED
      tags: ["Node", "Express"],
      stats: { comments: 1, attachments: 0, subtasks: "1/3" },
      members: [
        { name: "Sara", avatar: "/images/user3.jpg" },
      ],
    },
    {
      title: "Client Review",
      subtitle: "Feedback changes",
      priority: "Low",
      date: "15-Feb-2024",
      status: "completed",           // <---- ADDED
      tags: ["Review", "UI Fixes"],
      stats: { comments: 3, attachments: 1, subtasks: "4/4" },
      members: [
        { name: "Michael", avatar: "/images/user4.jpg" },
      ],
    }
  ];



  const fake = {
    priority: "High",
    title: "Website Project Proposal Review",
    subtitle: "Blog App Dashboard",
    date: "7-Feb-2024",
    tags: ["Design", "Website App"],
    stats: { comments: 4, attachments: 3, subtasks: "0/2" },
    members: [
      { name: "JS", avatar: "https://i.pravatar.cc/40?img=12" },
      { name: "JD", avatar: "https://i.pravatar.cc/40?img=32" },
      { name: "CA", avatar: "https://i.pravatar.cc/40?img=52" },
    ],
  };


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
            type="button" className='bg-blue-800 text-white rounded-md flex justify-center items-center text-md px-2 py-2 gap-1'>
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
              <IoMdAdd />
            </button>
          </div>

          {/* In Progress */}
          <div className="w-full bg-white rounded-md flex items-center justify-between px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <p className="text-sm font-semibold text-gray-700">In Progress</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center text-lg">
              <IoMdAdd />
            </button>
          </div>

          {/* Completed */}
          <div className="w-full bg-white rounded-md flex items-center justify-between px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
              <p className="text-sm font-semibold text-gray-700">Completed</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center text-lg">
              <IoMdAdd />
            </button>
          </div>

        </div>



        <div className="w-full flex gap-4 my-5 justify-center flex-wrap pb-3">



          <div className="flex flex-wrap gap-4">
            {tasks.map((item, index) => (
              <TaskCard
                key={index}
                task={item}
                setEditTask={setEditTask}
                setOpenAddTask={setOpenAddTask}
              />
            ))}
          </div>





        </div>



      </div>
    </>
  )
}

export default Tasks