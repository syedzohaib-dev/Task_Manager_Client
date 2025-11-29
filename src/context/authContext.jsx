import { createContext, useContext, useState, useEffect } from "react";
import { API_PATHS, BASE_URL } from "../utils/apiPath.js";
import axiosInstance from "../utils/axiosInstance.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`${BASE_URL}${API_PATHS.AUTH.GET_USER}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response?.data?.data);  // server returns data inside data.data
            console.log(response?.data?.data);
        } catch (error) {
            console.log("Failed to fetch user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user when app loads
    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            getUser,        // exposed so you can re-fetch when needed
            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy usage
export const useAuth = () => useContext(AuthContext);
