import axios from "axios";

// Use environment variable for base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// Add a request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
