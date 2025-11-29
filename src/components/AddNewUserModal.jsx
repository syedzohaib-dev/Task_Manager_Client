import React, { useState } from "react";
import { validateEmail } from '../utils/helper.js'

const AddNewUserModal = ({ openAddUser, onClose, }) => {
    if (!openAddUser) return null;

    const [formData, setFormData] = useState({
        fullName: "",
        title: "",
        email: "",
        password: "",
        role: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                {/* Modal Header */}
                <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                    Create User
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none hover:border-blue-800 focus:border-blue-800"
                        required
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Title (Developer - Designer - Artist)"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none hover:border-blue-800 focus:border-blue-800"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none hover:border-blue-800 focus:border-blue-800"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none hover:border-blue-800 focus:border-blue-800"
                        required
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Role (Admin / Staff / ...)"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none hover:border-blue-800 focus:border-blue-800"
                        required
                    />

                    {/* Buttons */}
                    <div className="w-full flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                        >
                            Create User
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddNewUserModal;
