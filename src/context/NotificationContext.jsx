import { createContext, useContext, useEffect, useState } from "react";
import { API_PATHS, } from "../utils/apiPath.js";
import axiosInstance from "../utils/axiosInstance.js";
import { errorToast, successToast } from '../utils/toast.js'

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState([])

    const createNotification = async (taskId, assignTaskTo) => {
        try {
            const token = localStorage.getItem('token')
            if (assignTaskTo && assignTaskTo.length > 0) {
                const res = await axiosInstance.post(`${API_PATHS.NOTIFICATION.CREATE_NOTI}`,
                    {
                        taskId,
                        assignTaskTo
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
        } catch (error) {
            errorToast(error.message)
            console.log(error)
        }
    }

    const getNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get(
                `${API_PATHS.NOTIFICATION.GET_NOTI}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setNotification(res?.data?.data || [])

            return res.data.data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getNotifications()
    }, [])


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
