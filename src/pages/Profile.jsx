import React, { useState } from "react";
import { FiEdit2, FiMail, FiUser, FiShield, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { useUser } from "../context/UserContext.jsx";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdFileUploadOff } from "react-icons/md";



const Profile = () => {
  const { user, setUploaderLoading, uploaderLoading } = useUser()
  const { handleProfileUpload } = useUser()

  if (user === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="p-6 text-center text-red-600">
        No user found
      </p>
    );
  }

  

  return (
    <div className="w-full h-screen  px-50 py-10 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <div className="flex flex-col items-center mb-6 relative">

          <div className="relative w-28 h-28">
            <img
              src={
                user.profileImgURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBj-1KIYtvjs4ft-nBOoDvTshg3UtK02xhhA&s"
              }
              alt="User"
              className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow"
            />

            <label className="absolute bottom-1 right-1 cursor-pointer">
              {uploaderLoading ?
                (<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-md hover:bg-blue-900 shadow">
                  <MdFileUploadOff />
                </div>)
                :
                (<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-md hover:bg-blue-900 shadow">
                  <IoCloudUploadOutline />
                </div>)
              }

              <input
                disabled={uploaderLoading}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleProfileUpload(e.target.files[0])}
              />
            </label>
          </div>

          <h2 className="mt-3 text-xl font-semibold text-gray-800">
            {user.fullName}
          </h2>
          <p className="text-gray-500">{user.title}</p>
        </div>

        <div className="space-y-4">
          <div className="flex w-full justify-evenly">
            <div className="flex w-full items-center gap-3 text-gray-700 ">
              <FiMail className="text-blue-800" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 text-gray-700">
              <FiShield className="text-blue-800" />
              <div>
                <p className="font-medium">Role</p>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-evenly">
            <div className="flex w-full items-center gap-3 text-gray-700">
              <FiBriefcase className="text-blue-800" />
              <div>
                <p className="font-medium">Designation / Title</p>
                <p className="text-gray-500">{user.title}</p>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 text-gray-700">
              <FiCheckCircle className="text-blue-800" />
              <div>
                <p className="font-medium">Account Status</p>
                <p className={`${user.isActive ? "text-green-600" : "text-red-600"}`}>
                  {user.isActive ? "Active" : "Disabled"}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
