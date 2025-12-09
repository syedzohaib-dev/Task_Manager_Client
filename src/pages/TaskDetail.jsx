import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiTag, FiUser, FiPaperclip } from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import TaskDetailDiv from "../components/TaskDetailDiv.jsx";
import Activities from "./Activities.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { id } = useParams();

  const { getTask, task, loading } = useTask()

  const [showTab, setShowTab] = useState(0)

  useEffect(() => {
    getTask(id)
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="w-full h-screen overflow-auto hide-scrollbar bg-gray-100 p-4 md:p-8">

      {/* Header */}
      <div className="w-full p-2">
        <p className="text-2xl font-semibold text-gray-600">Review Code Changes</p>
      </div>
      <div className="w-full flex px-2 gap-2 my-2">
        <button
          onClick={() => setShowTab(0)}
          type="button"
          className={`h-10  border-b-2 flex justify-center items-center text-md px-2  gap-1 bg-white 
          ${showTab === 0 ? 'border-blue-800 text-blue-800' : 'border-white text-black'} `}>
          <MdDashboard />
          Task Detail
        </button>
        <button
          onClick={() => setShowTab(1)}
          type="button"
          className={`h-10  border-b-2 flex justify-center items-center text-md px-2  gap-1 bg-white 
          ${showTab === 1 ? 'border-blue-800 text-blue-800' : 'border-white text-black'} `}>
          <FaList />
          Activities/Timeline
        </button>
      </div>

      {/* Main Card */}
      {
        showTab === 0 ? (
          <TaskDetailDiv task={task} />
        ) : (
          <Activities task={task} />
        )
      }


    </div>
  );
};

export default TaskDetail;