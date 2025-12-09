import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
    baseURL: isProduction
        ? ""
        : "http://localhost:3000",
});

export default axiosInstance;