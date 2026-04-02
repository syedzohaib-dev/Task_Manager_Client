import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
    baseURL: isProduction
        ? "https://task-manager-server-two-zeta.vercel.app"
        : "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("task-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auto logout on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("task-token");
      localStorage.removeItem("task-role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;