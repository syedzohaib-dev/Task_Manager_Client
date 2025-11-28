import React from "react";

const ProfileModal = ({ openProfile, onClose }) => {
    if (!openProfile) return null;

    return (
        <div className="fixed inset-0  flex justify-end items-start p-4">
            <div className="bg-white shadow-lg rounded-md w-50 px-2 mt-12">
                <div className="flex justify-end items-center">
                    <button onClick={onClose} className="text-gray-500 text-2xl">
                        ×
                    </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                    <div className="p-2 border-b border-gray-200 rounded">
                        <p className="text-sm">Profile</p>
                    </div>
                    <div className="p-2 border-b border-gray-200 rounded">
                        <p className="text-sm">Change Password</p>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
