import axios from "../api/axios";

export const registerAsLandlord = async (landlordData: {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
}) => {
  try {
    const response = await axios.post("/auth/signup", {
      ...landlordData,
      role: "landlord",
    });
    return response.data;
  } catch (error: any) {
    console.error("Landlord Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const submitRoom = async (roomData: FormData) => {
  try {
    const response = await axios.post("/landlord/submit-room", roomData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Submit Room Error:", error.response?.data || error.message);
    throw error;
  }
};
