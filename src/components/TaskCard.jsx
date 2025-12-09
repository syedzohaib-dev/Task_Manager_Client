import React, { useState } from "react";
import { FiMoreHorizontal, FiTag } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiComment } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";


import ThreeDotModal from "./ThreeDotModal.jsx";
import AddSubTaskModal from "./AddSubTaskModal.jsx";

const TaskCard = ({ task, setEditTask, setOpenAddTask, handleEdit, isTrashMode }) => {

  const [openAddSubTask, setOpenAddSubTask] = useState(false);
  const [openThreeDotModal, setOpenThreeDotModal] = useState(false);

  // priority colors inline
  const priorityColor =
    task.priorityLevel == "High"
      ? "text-red-600"
      : task.priorityLevel == "Low"
        ? "text-green-600"
        : "text-yellow-600";
  const priorityDot =
    task.priorityLevel == "High"
      ? "bg-red-500"
      : task.priorityLevel == "Low"
        ? "bg-green-500"
        : "bg-yellow-400";

  return (
    <>
      {/* Subtask Modal */}
      {!isTrashMode &&
        <AddSubTaskModal
          openAddSubTask={openAddSubTask}
          onClose={() => setOpenAddSubTask(false)}
          task={task}
        />
      }
      {/* <div className="h-[250px] border flex"> */}

      <div className="relative bg-white shadow-md h-[300px] w-[400px] min-w-[200px] min-h-[250px] rounded-lg border border-gray-200">
        <ThreeDotModal
          task={task}
          openThreeDotModal={openThreeDotModal}
          setOpenThreeDotModal={setOpenThreeDotModal}
          setEditTask={setEditTask}
          setOpenAddTask={setOpenAddTask}
          handleEdit={handleEdit}
          isTrashMode={isTrashMode}
          setOpenAddSubTask={setOpenAddSubTask}
        />

        {/* Header */}
        <div className="w-full flex flex-col">
          <div className="px-4 h-15 py-2 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${priorityDot} mt-1`} />
              <div className="">
                <div className={`text-xs font-semibold ${priorityColor}`}>
                  {task.priorityLevel?.toUpperCase()} PRIORITY
                </div>
                <div className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleDateString('en-pk')}</div>

              </div>
              {/* <span className={`py-1 px-2 rounded-full shadow-md text-sm ${task.isActive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
                {task.isActive ? "Active" : "InActive"}
              </span> */}
            </div>

            {openThreeDotModal ? (
              <button
                onClick={() => setOpenThreeDotModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoMdClose />
              </button>
            ) : (
              <button
                onClick={() => setOpenThreeDotModal(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiMoreHorizontal />
              </button>
            )}
          </div>

          <hr className="border-t border-gray-100" />

          {/* Body */}
          <div className="p-4 h-50 bg-white">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {task.taskTitle}
            </h3>

            {task.taskData && (
              <p className="text-xs text-gray-500 mb-1">{task.taskData}</p>
            )}

            {task.taskDesc && (
              <p className="text-xs text-gray-500 mb-3">{task.taskDesc}</p>
            )}

            {/* Tags direct */}
            <div className="flex flex-wrap gap-2 mb-3">
              {task.tag?.split(' ').map((t, i) => (
                <span
                  key={i}
                  className="w-20 flex items-center justify-center gap-1 text-xs px-1 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
                >
                  <FiTag size={12} />  {t.trim()}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BiComment className="text-[14px]" />
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <HiOutlineDocumentText className="text-[14px]" />
                  <span></span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <AiOutlineCheckSquare className="text-[14px]" />
                  <span>{task.subtasks}</span>
                </div>
                <span className={`px-3 py-1 rounded-sm shadow-md text-xs font-medium ${task.taskStage === "ToDo"
                  ? "bg-blue-200 text-blue-600"
                  : task.taskStage === "InProgress"
                    ? "bg-yellow-200 text-yellow-600"
                    : task.taskStage === "Completed"
                      ? "bg-green-200 text-green-600"
                      : "bg-gray-300"
                  }`}>
                  {task.taskStage}
                </span>
              </div>

              {/* Members direct */}
              <div className="flex -space-x-2 items-center">
                {task.assignTaskTo.map((m, i) => (
                  <img
                    key={i}
                    src={m.userId.profileImgURL || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}
                    alt={m.name}
                    title={m.name}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                  />
                ))}

              </div>
            </div>
          </div>

          {/* Add Subtask */}
          <div className="px-4 h-10 bg-white pb-4 w-full flex justify-between items-center">
            {
              !isTrashMode && (
                <button
                  onClick={() => {
                    setOpenAddSubTask(true)

                  }}
                  className="border-b border-dashed text-xs text-gray-500 px-2 text-left"
                >
                  + ADD SUBTASK
                </button>
              )}
            <img src="/images/cardsetting.gif" className="w-10 h-10" alt="" />
          </div>
        </div>
      </div>
      {/* </div> */}

    </>
  );
};

export default TaskCard;
