import axiosBase from "axios"; // rename original axios import

const axios = axiosBase.create({
  baseURL: "https://server-zeta-orpin.vercel.app/api",
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
