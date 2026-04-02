import { createContext, useContext, useEffect, useState } from "react";
import { API_PATHS, } from "../utils/apiPath.js";
import axiosInstance from "../utils/axiosInstance.js";
import { errorToast, successToast } from '../utils/toast.js'

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState([])
    const token = localStorage.getItem("task-token");

    const createNotification = async (taskId, assignTaskTo) => {
        try {
            if (!token) return;
            if (assignTaskTo && assignTaskTo.length > 0) {
                const res = await axiosInstance.post(`${API_PATHS.NOTIFICATION.CREATE_NOTI}`,
                    {
                        taskId,
                        assignTaskTo
                    });
            }
        } catch (error) {
            errorToast(error.message)
            console.log(error)
        }
    }

    const getNotifications = async () => {
        try {
            if (!token) return;
            const res = await axiosInstance.get(
                `${API_PATHS.NOTIFICATION.GET_NOTI}`);
            setNotification(res?.data?.data || [])

            return res.data.data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            getNotifications()
        }
    }, [token])


    return (
        <NotificationContext.Provider value={{
            createNotification,
            notification,
            getNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
export const useNotification = () => useContext(NotificationContext);
