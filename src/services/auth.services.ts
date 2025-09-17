import axios from "../api/axios";

export const register = async (userData: {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");
    return response.data;
  } catch (error: any) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post("/api/auth/refresh-token");
    return response.data;
  } catch (error: any) {
    console.error("Refresh Token Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Token refresh failed");
  }
};
