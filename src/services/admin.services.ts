import axios from "../api/axios";

// Authentication
export const adminLogin = async (credentials: { email: string; passkey: string }) => {
  try {
    const response = await axios.post("/auth/panel/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Admin Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Listings Management
export const getAllListings = async () => {
  try {
    const response = await axios.get("/admin/listings");
    return response.data;
  } catch (error: any) {
    console.error("Get All Listings Error:", error.response?.data || error.message);
    throw error;
  }
};

export const approveListing = async (id: string) => {
  try {
    const response = await axios.put(`/admin/listings/${id}/approve`);
    return response.data;
  } catch (error: any) {
    console.error("Approve Listing Error:", error.response?.data || error.message);
    throw error;
  }
};

export const rejectListing = async (id: string) => {
  try {
    const response = await axios.put(`/admin/listings/${id}/reject`);
    return response.data;
  } catch (error: any) {
    console.error("Reject Listing Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateListing = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/admin/listings/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Update Listing Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateListingImages = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(`/admin/listings/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Update Listing Images Error:", error.response?.data || error.message);
    throw error;
  }
};

export const markAsBooked = async (id: string) => {
  try {
    const response = await axios.put(`/admin/listings/${id}/book`);
    return response.data;
  } catch (error: any) {
    console.error("Mark As Booked Error:", error.response?.data || error.message);
    throw error;
  }
};

export const unmarkAsBooked = async (id: string) => {
  try {
    const response = await axios.put(`/admin/listings/${id}/unbook`);
    return response.data;
  } catch (error: any) {
    console.error("Unmark As Booked Error:", error.response?.data || error.message);
    throw error;
  }
};

// Analytics
export const getAdminAnalytics = async () => {
  try {
    const response = await axios.get("/admin/listings/analytics");
    return response.data;
  } catch (error: any) {
    console.error("Get Analytics Error:", error.response?.data || error.message);
    throw error;
  }
};

// User Management
export const getAllUsers = async () => {
  try {
    const response = await axios.get("/admin/users");
    return response.data;
  } catch (error: any) {
    console.error("Get All Users Error:", error.response?.data || error.message);
    throw error;
  }
};

export const addUserBalance = async (data: { userId?: string; email?: string; amount: number }) => {
  try {
    const response = await axios.post("/admin/user/balance", data);
    return response.data;
  } catch (error: any) {
    console.error("Add User Balance Error:", error.response?.data || error.message);
    throw error;
  }
};

// Issues
export const getAllIssues = async () => {
  try {
    const response = await axios.get("/admin/issues");
    return response.data;
  } catch (error: any) {
    console.error("Get All Issues Error:", error.response?.data || error.message);
    throw error;
  }
};

// Enquiries
export const getAllEnquiries = async () => {
  try {
    const response = await axios.get("/admin/enquiries");
    return response.data;
  } catch (error: any) {
    console.error("Get All Enquiries Error:", error.response?.data || error.message);
    throw error;
  }
};

// Interests
export const getAllInterests = async () => {
  try {
    const response = await axios.get("/admin/interests");
    return response.data;
  } catch (error: any) {
    console.error("Get All Interests Error:", error.response?.data || error.message);
    throw error;
  }
};

// Create Room
export const createRoom = async (formData: FormData) => {
  try {
    const response = await axios.post("/admin/listings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Create Room Error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete Listing
export const deleteListing = async (id: string) => {
  try {
    const response = await axios.delete(`/admin/listings/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete Listing Error:", error.response?.data || error.message);
    throw error;
  }
};
