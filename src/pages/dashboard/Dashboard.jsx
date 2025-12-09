import { use, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationModal from "../../components/NotificationModal.jsx";
import ProfileModal from "../../components/ProfileModal.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";

const Dashboard = ({ role }) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [allUser, setAllUser] = useState([])
    const [openNotify, setOpenNotify] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const [openAddTask, setOpenAddTask] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const { notification } = useNotification()





    return (
        <>
            <NotificationModal
                openNotify={openNotify}
                onClose={() => setOpenNotify(false)}
            />
            <ProfileModal
                openProfile={openProfile}
                onClose={() => setOpenProfile(false)}
            />
            <div className="flex h-screen bg-gray-100">
                <Sidebar
                    role={role}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-30 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className={`bg-gray-100 shadow-md flex items-center justify-between md:justify-end px-6 py-1`}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-2xl text-blue-600 md:hidden focus:outline-none"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>

                        <div className="flex items-center gap-3">
                            <button type="button"
                                onClick={() => setOpenNotify(true)}
                                className="relative text-[1.2rem] bg-gray-50 rounded-md w-8 h-8 text-black flex justify-center items-center">
                                <IoMdNotificationsOutline />
                                {notification.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                        {notification?.length || 0}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                className=""
                                onClick={() => setOpenProfile(true)}
                            >
                                {
                                    user?.profileImgURL ?
                                        (<img
                                            src={user?.profileImgURL}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full   border-gray-300"
                                        />)
                                        :
                                        (<img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full   border-gray-300"
                                        />)
                                }

                            </button>
                            <div className="flex flex-col">
                                <span className="text-gray-800 font-semibold text-sm sm:text-base flex">
                                    {/* {user?.name} */} {user?.fullName}
                                </span>
                                <span className="text-gray-500 text-xs sm:text-sm flex ">{role}</span>
                            </div>
                            {/* <button type="button" className="bg-blue-700 py-2 px-3 rounded-md text-white font-bold">Logout</button> */}
                        </div>
                    </header>

                    <main className="w-full h-full hide-scrollbar bg-white" > {/* yahan bhi min-h-0 */}
                        <Outlet context={{ setOpenAddTask, setEditTask, editTask, openAddTask }} />
                    </main>
                </div>
            </div >
        </>
    );
};

export default Dashboard;