import React, { useEffect } from "react";
import { useNotification } from "../context/NotificationContext.jsx";

const NotificationModal = ({ openNotify, onClose, }) => {
    if (!openNotify) return null;
    const { notification,getNotifications } = useNotification()

    useEffect(() => {
        if (openNotify) {
            getNotifications();
        }
    }, [openNotify]);

    return (
        <div className="fixed inset-0  flex justify-end items-start p-4">
            <div className="bg-white shadow-lg rounded-md w-100 p-4 mt-12">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">
                        ×
                    </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notification.length === 0 ? (
                        <p className="text-gray-500 text-sm">No notifications yet.</p>
                    ) : (
                        notification?.map((note, index) => (
                            <div key={index} className="p-2 border-b border-gray-200 rounded">
                                <p className="text-sm">{note?.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
