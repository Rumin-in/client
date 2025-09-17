import axios from "../api/axios";

export const getAllRooms = async () => {
  try {
    const response = await axios.get("/rooms");
    return response.data;
  } catch (error: any) {
    console.error("Get All Rooms Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch rooms");
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const response = await axios.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error: any) {
    console.error("Get Room By ID Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch room details");
  }
};
