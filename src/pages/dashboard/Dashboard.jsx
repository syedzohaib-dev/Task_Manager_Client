import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const Dashboard = ({ role }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [allUser, setAllUser] = useState([])


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                role="admin"
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
                <header className={`bg-white shadow-md flex items-center justify-between md:justify-end px-6 py-1`}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-2xl text-blue-600 md:hidden focus:outline-none"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-[1.2rem] bg-gray-50 rounded-md w-8 h-8 text-gray-500 flex justify-center items-center">
                            <IoMdNotificationsOutline /><sup className="text-red-600"><b>•</b></sup>
                        </span>
                        <img
                            src="/images/image.png"
                            alt="Profile"
                            className="w-10 h-10 rounded-full  border-gray-300"
                        />
                        <div className="flex flex-col">
                            <span className="text-gray-800 font-semibold text-sm sm:text-base flex">
                                {/* {user?.name} */} Zohaib
                            </span>
                            <span className="text-gray-500 text-xs sm:text-sm flex ">{role}</span>
                        </div>
                        {/* <button type="button" className="bg-blue-700 py-2 px-3 rounded-md text-white font-bold">Logout</button> */}
                    </div>
                </header>

                <main className="w-full h-full overflow-y-scroll hide-scrollbar bg-white" > {/* yahan bhi min-h-0 */}
                    <Outlet />
                </main>
            </div>
        </div >
    );
};

export default Dashboard;