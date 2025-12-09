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



    const getTask = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.get(`${API_PATHS.TASK.GET_TASK}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTask(response?.data?.data);
            return response?.data?.data;
        } catch (error) {
            console.log("Failed to fetch user:", error);
            setTask(null);
        } finally {
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     getTask();
    // }, []);


    const getAllTask = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");

            if (!token) {
                setLoading(false);
                return;
            }
            const url =
                user?.role === "admin"
                    ? API_PATHS.TASK.GET_ALL_TASK
                    : API_PATHS.TASK.GET_MY_TASK;


            const response = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAllTask(
                response?.data?.data
                ||
                response?.data?.tasks ||
                []
            );
        } catch (error) {
            console.log("Failed to fetch all task:", error);
            setAllTask([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user && user.role) {
            getAllTask();
        }
    }, [user])

    const getStats = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.get(`${API_PATHS.TASK.GET_STATS}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
        getStats();
    }, []);

    const addComment = async (taskId, commentText) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axiosInstance.post(
                `${API_PATHS.TASK.ADD_COMMENT}/${taskId}`,
                {
                    name: user.fullName,
                    desc: commentText
                },
                { headers: { Authorization: `Bearer ${token}`, }, }
            );
            setTask(response?.data?.data);

            await getTask(taskId);

            return response?.data?.data;
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };


    const moveToTrash = async (taskId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.put(
                `${API_PATHS.TASK.MOVE_TO_TRASH}/${taskId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.put(
                `${API_PATHS.TASK.RESTORE_TRASH}/${taskId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.delete(
                `${API_PATHS.TASK.DELETE_TASK}/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.post(
                `${API_PATHS.TASK.DUPLICATE_TASK}/${taskId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axiosInstance.post(
                `${API_PATHS.TASK.ADD_SUB_TASK}/${taskId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axiosInstance.post(
                `${API_PATHS.TASK.ADD_ACTIVITY}/${taskId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res?.data?.data;
        } catch (err) {
            console.log("Failed to add activity:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changeTaskStatus = async (taskId, taskStage) => {
        console.log("API call to:", `${API_PATHS.TASK.UPDATE_STATUS}/${taskId}`);
        try {
            const token = localStorage.getItem('token')
            const res = await axiosInstance.put(`${API_PATHS.TASK.UPDATE_STATUS}/${taskId}`,
                taskStage,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
