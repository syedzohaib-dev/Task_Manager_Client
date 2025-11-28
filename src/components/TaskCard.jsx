import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiComment } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

import ThreeDotModal from "./ThreeDotModal.jsx";
import AddSubTaskModal from "./AddSubTaskModal.jsx";

const TaskCard = ({ task, setEditTask, setOpenAddTask }) => {

  const [openAddSubTask, setOpenAddSubTask] = useState(false);
  const [openThreeDotModal, setOpenThreeDotModal] = useState(false);

  // priority colors inline
  const priorityColor =
    task.priority === "High"
      ? "text-red-600"
      : task.priority === "Low"
        ? "text-green-600"
        : "text-yellow-600";
  const priorityDot =
    task.priority === "High"
      ? "bg-red-500"
      : task.priority === "Low"
        ? "bg-green-500"
        : "bg-yellow-400";

  return (
    <>
      {/* Subtask Modal */}
      <AddSubTaskModal
        openAddSubTask={openAddSubTask}
        onClose={() => setOpenAddSubTask(false)}
      />

      {/* <div className="h-[250px] border flex"> */}
        <div className="relative bg-white shadow-sm min-w-[320px] my-2 w-[420px] h-[250px] rounded-md">
          <ThreeDotModal
            openThreeDotModal={openThreeDotModal}
            setOpenThreeDotModal={setOpenThreeDotModal}
            setEditTask={setEditTask}
            setOpenAddTask={setOpenAddTask}
          />

          {/* Header */}
          <div className="px-4 py-2 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${priorityDot} mt-1`} />
              <div>
                <div className={`text-xs font-semibold ${priorityColor}`}>
                  {task.priority} PRIORITY
                </div>
                <div className="text-xs text-gray-500">{task.date}</div>
              </div>
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
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {task.title}
            </h3>

            {task.subtitle && (
              <p className="text-xs text-gray-500 mb-3">{task.subtitle}</p>
            )}

            {/* Tags direct */}
            <div className="flex flex-wrap gap-2 mb-3">
              {task.tags.map((t, i) => (
                <span
                  key={i}
                  className="inline-block text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats & Members direct */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BiComment className="text-[14px]" />
                  <span>{task.stats.comments}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <HiOutlineDocumentText className="text-[14px]" />
                  <span>{task.stats.attachments}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <AiOutlineCheckSquare className="text-[14px]" />
                  <span>{task.stats.subtasks}</span>
                </div>
              </div>

              {/* Members direct */}
              <div className="flex -space-x-2 items-center">
                {task.members.map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    title={m.name}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Add Subtask */}
          <div className="px-4 pb-4">
            <button
              onClick={() => setOpenAddSubTask(true)}
              className="text-xs text-gray-500 w-full text-left"
            >
              + ADD SUBTASK
            </button>
          </div>
        </div>
      {/* </div> */}

    </>
  );
};

export default TaskCard;
