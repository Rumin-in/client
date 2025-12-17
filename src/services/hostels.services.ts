import axios from "../api/axios";

export const getAllHostels = async () => {
  try {
    const response = await axios.get("/hostels");
    return response.data;
  } catch (error: any) {
    console.error("Get All Hostels Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch hostels");
  }
};

export const getHostelById = async (hostelId: string) => {
  try {
    const response = await axios.get(`/hostels/${hostelId}`);
    return response.data;
  } catch (error: any) {
    console.error("Get Hostel By ID Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch hostel details");
  }
};

export const createHostel = async (hostelData: FormData | any) => {
  try {
    const isFormData = hostelData instanceof FormData;
    const response = await axios.post("/hostels", hostelData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return response.data;
  } catch (error: any) {
    console.error("Create Hostel Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create hostel");
  }
};

export const updateHostel = async (hostelId: string, hostelData: any) => {
  try {
    const response = await axios.put(`/hostels/${hostelId}`, hostelData);
    return response.data;
  } catch (error: any) {
    console.error("Update Hostel Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update hostel");
  }
};

export const deleteHostel = async (hostelId: string) => {
  try {
    const response = await axios.delete(`/hostels/${hostelId}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete Hostel Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete hostel");
  }
};

export const getAllHostelsForAdmin = async () => {
  try {
    const response = await axios.get("/hostels/admin/all");
    return response.data;
  } catch (error: any) {
    console.error("Get All Hostels For Admin Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch hostels");
  }
};
