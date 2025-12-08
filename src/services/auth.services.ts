import axios from "../api/axios";

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post("/auth/signup", userData);
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post("/auth/refresh-token");
    return response.data;
  } catch (error: any) {
    console.error("Refresh Token Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Token refresh failed");
  }
};

export const updateProfile = async (profileData: { name?: string; email?: string; mobileNo?: string; profilePicture?: File }) => {
  try {
    const formData = new FormData();
    if (profileData.name) formData.append("name", profileData.name);
    if (profileData.email) formData.append("email", profileData.email);
    if (profileData.mobileNo) formData.append("mobileNo", profileData.mobileNo);
    if (profileData.profilePicture) formData.append("profilePicture", profileData.profilePicture);

    const response = await axios.put("/auth/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Update Profile Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Profile update failed");
  }
};
