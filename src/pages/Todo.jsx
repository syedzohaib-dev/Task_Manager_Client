import React from 'react'
import TaskCard from '../components/TaskCard.jsx';
import { useOutletContext } from 'react-router-dom';
import { useTask } from '../context/TaskContext.jsx';

const Todo = () => {
  const { setOpenAddTask, setEditTask } = useOutletContext();
  const { allTask } = useTask()


  return (
    <>
      <div className="w-full h-full overflow-y-auto bg-gray-100 flex gap-4 justify-center flex-wrap py-2 px-2">
        {(allTask.length === 0) && (
          <p className='w-full h-20 m-5 text-center shadow-md px-8 py-5 bg-red-100 text-black text-2xl rounded'>
            No <b>Todo</b> Task Found
          </p>
        )}

        {/* <div className="w-full flex gap-4 my-5 justify-center flex-wrap pb-3"> */}
        {allTask
          .filter(task => task.taskStage === "ToDo")
          .map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              setEditTask={setEditTask}
              setOpenAddTask={setOpenAddTask}
            />
          ))}
        {/* </div> */}
      </div>
    </>
  )
}

export default Todo