import { createContext, useContext, useState, useEffect } from "react";
import { API_PATHS, } from "../utils/apiPath.js";
import axiosInstance from "../utils/axiosInstance.js";
import { errorToast, successToast } from '../utils/toast.js'
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext.jsx";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allTask, setAllTask] = useState([])
    const [uploaderLoading, setUploaderLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useUser()
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("task-token");




    const getTask = async (id) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.get(`${API_PATHS.TASK.GET_TASK}/${id}`);
            setTask(response?.data?.data);
            return response?.data?.data;
        } catch (error) {
            console.log("Failed to fetch user:", error);
            setTask(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            getTask();
        }

    }, [token]);


    const getAllTask = async () => {
        try {
            if (!token) return;
            setLoading(true);
            const role = localStorage.getItem("task-role");
            const url =
                user?.role === "admin"
                    ? API_PATHS.TASK.GET_ALL_TASK
                    : API_PATHS.TASK.GET_MY_TASK;


            const response = await axiosInstance.get(url);
            setAllTask(
                response?.data?.data
                ||
                response?.data?.tasks ||
                []
            );
            // console.log(response?.data?.data)
        } catch (error) {
            console.log("Failed to fetch all task:", error);
            setAllTask([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            if (user && user.role) {
                getAllTask();
            }
        }
    }, [user, token])

    const getStats = async (id) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.get(`${API_PATHS.TASK.GET_STATS}`);
            setStats(response?.data);
            return response?.data;
        } catch (error) {
            console.log("Failed to fetch stats:", error);
            setStats(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            getStats();
        }
    }, [token]);

    const addComment = async (taskId, commentText) => {
        try {
            if (!token) return;
            const response = await axiosInstance.post(
                `${API_PATHS.TASK.ADD_COMMENT}/${taskId}`,
                {
                    name: user.fullName,
                    desc: commentText
                });
            setTask(response?.data?.data);

            await getTask(taskId);

            return response?.data?.data;
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };


    const moveToTrash = async (taskId) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.put(`${API_PATHS.TASK.MOVE_TO_TRASH}/${taskId}`);
            await getAllTask();
            return response?.data?.data;
        } catch (error) {
            console.error("Failed to move task to trash:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const restoreFromTrash = async (taskId) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.put(`${API_PATHS.TASK.RESTORE_TRASH}/${taskId}`);
            await getAllTask();
            return response?.data?.data;
        } catch (error) {
            console.error("Failed to move task to trash:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteTaskHandler = async (taskId) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.delete(
                `${API_PATHS.TASK.DELETE_TASK}/${taskId}`);
            await getAllTask();
            return response?.data?.data;
        } catch (error) {
            console.error("Failed to delete task:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const duplicateTaskHandler = async (taskId) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.post(`${API_PATHS.TASK.DUPLICATE_TASK}/${taskId}`);
            await getAllTask();
            return response?.data?.data;
        } catch (error) {
            console.error("Failed to duplicate task:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addSubTaskHandler = async (taskId, formData) => {
        try {
            if (!token) return;
            setLoading(true);
            const response = await axiosInstance.post(`${API_PATHS.TASK.ADD_SUB_TASK}/${taskId}`, formData);
            await getAllTask();
            return response?.data?.data;
        } catch (error) {
            console.error("Failed to add sub task:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addActivityHandler = async (taskId, payload) => {
        try {
            if (!token) return;
            setLoading(true);
            const res = await axiosInstance.post(
                `${API_PATHS.TASK.ADD_ACTIVITY}/${taskId}`,
                payload);

            return res?.data?.data;
        } catch (err) {
            console.log("Failed to add activity:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changeTaskStatus = async (taskId, taskStage) => {
        try {
            if (!token) return;
            const res = await axiosInstance.put(`${API_PATHS.TASK.UPDATE_STATUS}/${taskId}`,
                taskStage);
            getTask(taskId);
        } catch (error) {
            errorToast("Something went wrong status not update");
            console.log(error)
        }
    };



    return (
        <TaskContext.Provider value={{
            task,
            loading,

            getTask,

            allTask,
            setAllTask,
            getAllTask,

            stats,

            addComment,

            moveToTrash,
            restoreFromTrash,

            deleteTaskHandler,
            duplicateTaskHandler,

            addSubTaskHandler,

            addActivityHandler,

            changeTaskStatus,
        }}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook for easy usage
export const useTask = () => useContext(TaskContext);
