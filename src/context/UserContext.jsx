import { createContext, useContext, useState, useEffect } from "react";
import { API_PATHS, } from "../utils/apiPath.js";
import axiosInstance from "../utils/axiosInstance.js";
import { errorToast, successToast } from '../utils/toast.js'
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState([])
    const [uploaderLoading, setUploaderLoading] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("task-token");

    const getUser = async () => {
        try {
            if (!token) return;
            setLoading(true)
            const response = await axiosInstance.get(`${API_PATHS.USER.GET_USER}`);
            setUser(response?.data?.data);
        } catch (error) {
            console.log("Failed to fetch user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            getUser();
        }

    }, [token]);


    const getAllUser = async () => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.get(`${API_PATHS.USER.GET_ALL_USERS}`);
            setAllUser(response?.data?.data);
            // console.log('all users:', response?.data?.data);
        } catch (error) {
            console.log("Failed to fetch user:", error);
            setAllUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            getAllUser()
        }

    }, [token])


    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.delete(`${API_PATHS.USER.DELETE_USER}/${userId}`);
            setAllUser((prev) => prev.filter((user) => user._id !== userId));
        } catch (error) {
            console.log("Failed to delete user:", error);
            errorToast(error?.response?.data?.message || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    };


    const handleProfileUpload = async (file) => {
        if (!file) return;
        const userId = localStorage.getItem('task-userId')

        try {
            if (!token) return;
            setUploaderLoading(true)
            const formData = new FormData();
            formData.append("image", file);
            const response = await axiosInstance.post(`${API_PATHS.USER.UPLOAD_PROFILE}/${userId}`);
            if (response.data.success) {
                await getUser()
            }
            successToast("Profile updated");
        } catch (error) {
            console.log("Image upload failed:", error);
        } finally {
            setUploaderLoading(false)
        }
    };


    const handleLogout = async () => {
        try {
            if (!token) return;
            const res = await axiosInstance.post(`${API_PATHS.USER.LOGOUT}`);
            localStorage.removeItem("task-token");
            localStorage.removeItem("task-userId");
            localStorage.removeItem("task-role");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.log("Logout failed:", error);
            errorToast("Something went wrong");
        }
    };

    return (
        <UserContext.Provider value={{
            user,
            loading,

            getUser,

            allUser,
            setAllUser,
            getAllUser,

            deleteUser,

            handleProfileUpload,

            setUploaderLoading,
            uploaderLoading,

            handleLogout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for easy usage
export const useUser = () => useContext(UserContext);
