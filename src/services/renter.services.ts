import axios from "../api/axios";

export const submitEnquiry = async (data: {
  name: string;
  email: string;
  mobileNo: string;
  subject?: string;
  message: string;
}) => {
  try {
    const response = await axios.post('/renter/enquire', data);
    return response.data;
  } catch (error: any) {
    console.error("Submit Enquiry Error:", error.response?.data || error.message);
    throw error;
  }
};

export const enquireRoom = async (roomId: string, message: string) => {
  try {
    const response = await axios.post('/renter/enquire', { roomId, message });
    return response.data;
  } catch (error: any) {
    console.error("Enquire Room Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send enquiry");
  }
};

export const interestRoom = async (roomId: string) => {
  try {
    const response = await axios.post(`/renter/rooms/${roomId}/interest`);
    return response.data;
  } catch (error: any) {
    console.error("Interest Room Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to express interest in room");
  }
};

export const bookmarkRoom = async (roomId: string) => {
  try {
    const response = await axios.post(`/renter/rooms/${roomId}/bookmark`);
    return response.data;
  } catch (error: any) {
    console.error("Bookmark Room Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to bookmark room");
  }
};

export const deleteBookmark = async (roomId: string) => {
  try {
    const response = await axios.delete(`/renter/rooms/${roomId}/bookmark`);
    return response.data;
  } catch (error: any) {
    console.error("Delete Bookmark Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete bookmark");
  }
};

export const getBookmarks = async (userId: string) => {
  try {
    const response = await axios.get(`/renter/bookmarks/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Get Bookmarks Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch bookmarks");
  }
};

export const referRoom = async (roomId: string, email: string) => {
  try {
    const response = await axios.post('/renter/rooms/refer', { roomId, email });
    return response.data;
  } catch (error: any) {
    console.error("Refer Room Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to refer room");
  }
};

export const getNearbyRooms = async (latitude: number, longitude: number, radius: number) => {
  try {
    const response = await axios.get('/renter/rooms/getNearbyRooms', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  } catch (error: any) {
    console.error("Get Nearby Rooms Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch nearby rooms");
  }
};

export const sendFeedback = async (rating: number, comments: string) => {
  try {
    const response = await axios.post('/renter/feedback', { rating, comments });
    return response.data;
  } catch (error: any) {
    console.error("Send Feedback Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send feedback");
  }
};
