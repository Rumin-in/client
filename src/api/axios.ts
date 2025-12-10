import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://server-idjt.onrender.com/api",
  // baseURL: "https://api.rumin.in/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies (refresh token)
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Let browser set Content-Type automatically for FormData (includes boundary)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 (token expired) with auto-refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if it's an admin route
      const currentPath = window.location.pathname;
      const isAdminRoute = currentPath.includes("/admin");

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const response = await axiosBase.post(
          `${axios.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data.data;

        if (accessToken) {
          // Store the new token
          if (isAdminRoute) {
            localStorage.setItem("adminToken", accessToken);
          } else {
            localStorage.setItem("token", accessToken);
          }

          // Update the authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Process queued requests
          processQueue(null, accessToken);

          // Retry the original request
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect
        processQueue(refreshError, null);

        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");

        // Dispatch logout event for Redux or other state management
        const logoutEvent = new CustomEvent("authTokenExpired");
        window.dispatchEvent(logoutEvent);

        // Redirect to login
        if (isAdminRoute) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
