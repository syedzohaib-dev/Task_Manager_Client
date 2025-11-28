import React from 'react'
import TaskCard from '../components/TaskCard.jsx';
import { useOutletContext } from 'react-router-dom';

const Todo = () => {
  const { setOpenAddTask, setEditTask } = useOutletContext();

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

  return (
    <>
      <div className="w-full h-screen overflow-y-auto bg-gray-100 flex gap-4 my-5 justify-center flex-wrap pb-3">


        <div className="flex flex-wrap gap-4">
          {tasks
            .filter(task => task.status === "todo")   // <-- FILTER HERE
            .map((task, index) => (
              <TaskCard
                key={index}
                task={task}
                setEditTask={setEditTask}
                setOpenAddTask={setOpenAddTask}
              />
            ))}
        </div>

      </div>
    </>
  )
}

export default Todo