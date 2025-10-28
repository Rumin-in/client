import axiosBase from "axios"; 

const axios = axiosBase.create({
  baseURL: "https://server-idjt.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
