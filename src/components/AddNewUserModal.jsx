import React, { useState } from "react";
import { validateEmail } from '../utils/helper.js'
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPath.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useUser } from "../context/UserContext.jsx";
import { errorToast, successToast } from "../utils/toast.js";

const AddNewUserModal = ({ openAddUser, onClose, editUser }) => {
    const { getAllUser } = useUser()
    if (!openAddUser) return null;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassord] = useState(false)
    const finalType = showPassword ? "text" : "password";

    const toggleShowPassword = () => {
        setShowPassord(!showPassword)
    };
    const token = localStorage.getItem('token')

    const [formData, setFormData] = useState(
        editUser
            ?
            {
                fullName: editUser.fullName || "",
                title: editUser.title || "",
                role: editUser.role || "",
            }
            :
            {
                fullName: "",
                title: "",
                email: "",
                password: "",
                role: "",
            }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName) errors.fullName = "Full name required";
        if (!formData.title) errors.title = "Title required";
        if (!formData.role) errors.role = "Role required";
        if (!editUser) {
            if (!formData.password) errors.password = "Password required";
            if (!validateEmail(formData.email)) {
                errors.email = 'Please enter a valid email address.'
            }
        }

        return errors;
    };


    const handleSignup = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (loading) return;
        setLoading(true);

        try {

            if (editUser) {
                // UPDATE USER API
                const response = await axiosInstance.put(
                    `${API_PATHS.USER.EDIT_USER}/${editUser._id}`,
                    {
                        fullName: formData.fullName,
                        title: formData.title,
                        role: formData.role,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                // CREATE USER API
                const response = await axiosInstance.post(
                    `${API_PATHS.AUTH.SIGNUP}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            // Reset form
            setFormData({
                fullName: "",
                title: "",
                email: "",
                password: "",
                role: "",
            });

            onClose()
            getAllUser()

            // editUser ? successToast('User Edit Successful') : successToast('User Create Successful')

        } catch (err) {
            console.log("Signup Error:", err);

            const message =
                err.response?.data?.message || "Signup failed. Try again.";

            errorToast(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                {/* Modal Header */}
                <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                    {editUser ? "Update User" : "Create User"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg outline-none hover:border-blue-800 ${errors.fullName ? ' border-red-400' : 'border-gray-300'}`}

                        />
                        <div className="h-4 flex items-center">
                            {errors.fullName && <p className='text-red-500 text-xs'>{errors.fullName}</p>}
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <select
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg outline-none hover:border-blue-800 ${errors.title ? ' border-red-400' : 'border-gray-300'}`}
                        >
                            <option value="">Select Title</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="MERN Stack Developer">MERN Stack Developer</option>
                            <option value="React Developer">React Developer</option>
                            <option value="JavaScript Developer">JavaScript Developer</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Web Designer">Web Designer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                            <option value="Product Designer">Product Designer</option>
                            <option value="Artist">Artist</option>
                            <option value="Content Creator">Content Creator</option>
                            <option value="Video Editor">Video Editor</option>

                        </select>
                        <div className="h-4 flex items-center">
                            {errors.title && <p className='text-red-500 text-xs'>{errors.title}</p>}
                        </div>
                    </div>
                    {!editUser && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg outline-none hover:border-blue-800 ${errors.email ? ' border-red-400' : 'border-gray-300'}`}
                            />
                            <div className="h-4 flex items-center">
                                {errors.email && <p className='text-red-500 text-xs flex items-center'>{errors.email}</p>}
                            </div>
                        </div>
                    )}
                    {!editUser && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className={`w-full flex justify-center items-center border pr-2  rounded-lg hover:border-blue-800 outline-none ${errors.email ? ' border-red-400' : 'border-gray-300'}`}>
                                <input
                                    type={finalType}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg outline-none `}
                                    placeholder="Enter your password"
                                />
                                {
                                    <>
                                        {showPassword ? (
                                            <FaRegEye
                                                size={22}
                                                className='text-text-slate-400 cursor-pointer'
                                                onClick={() => toggleShowPassword()}
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                size={22}
                                                className='text-slate-400 cursor-pointer'
                                                onClick={() => toggleShowPassword()}
                                            />
                                        )

                                        }
                                    </>

                                }
                            </div>
                            <div className="h-4 flex items-center">
                                {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}

                            className={`w-full p-3 border rounded-lg outline-none hover:border-blue-800 ${errors.role ? ' border-red-400' : 'border-gray-300'}`}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className="h-4 flex items-center">
                            {errors.role && <p className='text-red-500 text-xs'>{errors.role}</p>}
                        </div>
                    </div>

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
                            disabled={loading}
                            className={`w-full px-4 py-2 text-white rounded-lg hover:bg-blue-900 ${loading ? 'bg-blue-400/40' : "bg-blue-800"}`}
                        >
                            {loading ? (editUser ? "Updating..." : "Creating...") : editUser ? "Update User" : "Create User"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddNewUserModal;
