import axiosBase from "axios"; 

const axios = axiosBase.create({
  // baseURL: "http://rumin.ap-south-1.elasticbeanstalk.com/api",
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

// Response interceptor for handling 401 (token expired)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      
      // Dispatch logout event for Redux or other state management
      const logoutEvent = new CustomEvent("authTokenExpired");
      window.dispatchEvent(logoutEvent);
      
      // Redirect to admin login if on admin page
      const currentPath = window.location.pathname;
      if (currentPath.includes("/admin")) {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
