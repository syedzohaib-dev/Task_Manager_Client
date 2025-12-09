import React from 'react'
import TaskCard from '../components/TaskCard'
import { useTask } from '../context/TaskContext'

const Trash = () => {
  const { allTask } = useTask()
  return (
    <>
      <div className="h-screen overflow-y-auto bg-gray-100 p-6">
        <div className="w-full flex gap-4 my-5 justify-center flex-wrap pb-3">
          {(allTask.length === 0) && (
            <p className='w-full h-20 m-5 text-center shadow-md px-8 py-5 bg-red-100 text-black text-2xl rounded'>
              No Task Found
            </p>
          )}
          {allTask
            ?.filter((item) => item.isTrashed === true)
            .map((item, index) => (
              <TaskCard
                key={index}
                task={item}
                isTrashMode={true}
              // setEditTask={setEditTask}
              // setOpenAddTask={setOpenAddTask}
              // handleEdit={handleEdit}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Trash