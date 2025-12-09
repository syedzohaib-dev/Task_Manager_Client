import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
    baseURL: isProduction
        ? "https://task-manager-server-two-zeta.vercel.app"
        : "http://localhost:3000",
});

export default axiosInstance;