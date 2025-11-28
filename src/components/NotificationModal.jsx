import React from "react";

const NotificationModal = ({ openNotify, onClose, notifications }) => {
    if (!openNotify) return null;

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
                    {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No notifications yet.</p>
                    ) : (
                        notifications.map((note, i) => (
                            <div key={i} className="p-2 border-b border-gray-200 rounded">
                                <p className="text-sm">{note}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
