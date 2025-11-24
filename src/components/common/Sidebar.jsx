import React from "react";
import { FaTasks } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAddTask, MdDashboard } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";
import { GiTeamDowngrade } from "react-icons/gi";
import { FaRegTrashAlt } from "react-icons/fa";






const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Local storage clear
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");


    navigate("/");
  };


  const menus = {
    user: [
      // { name: "Quotation", path: "createinvoice", icon: <BsFillClipboard2MinusFill /> },
      // { name: "Client List", path: "clientlist", icon: <HiUsers /> },
      // { name: "Templates", path: "templates", icon: <BsLayoutWtf /> },
      // { name: "View History", path: "history", icon: <MdHistory /> },
    ],
    admin: [
      { name: "Dashboard", path: "stats", icon: <MdDashboard /> },
      { name: "Tasks", path: "tasks", icon: <FaTasks /> },
      { name: "Completed", path: "completed", icon: <MdAddTask /> },
      { name: "In Progress", path: "inprogress", icon: <GrInProgress /> },
      { name: "Todo", path: "todo", icon: <LuListTodo /> },
      { name: "Team", path: "team", icon: <GiTeamDowngrade /> },
      { name: "Trash", path: "trash", icon: <FaRegTrashAlt /> },
    ],
  };

  const links = menus[role] || [];

  return (
    <div
      className={` border-gray-400 fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-40 flex flex-col
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
     

     
     
        <>
          <nav className="flex-1 py-4">
            <div className="space-y-2 px-4">
              {links.map((link, index) => (
                <NavLink
                  to={link.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center gap-3 my-3 px-4 py-2 text-[1rem] rounded-md transition ${isActive
                      ? "bg-blue-800 text-white"
                      : "bg-white text-black hover:bg-gray-100"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}

            </div>

          </nav>
          <button className="flex items-center  justify-center my-4 mx-2 px-16 py-2 rounded-md bg-black text-white" onClick={handleLogout}>
            Logout
          </button>
        </>
      


    </div>
  );
};

export default Sidebar;