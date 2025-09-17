import axios from "../api/axios";


export const createCoupon = async (data: { code: string; discount: number; expiry: string }) => {
  try {
    const response = await axios.post("/api/walletAndCoupan/coupon", data);
    return response.data;
  } catch (error: any) {
    console.error("Create Coupon Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create coupon");
  }
};

export const getAllCoupons = async () => {
  try {
    const response = await axios.get("/api/walletAndCoupan/coupons");
    return response.data;
  } catch (error: any) {
    console.error("Get Coupons Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch coupons");
  }
};

export const deleteCoupon = async (couponId: string) => {
  try {
    const response = await axios.delete(`/api/walletAndCoupan/coupon/${couponId}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete Coupon Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete coupon");
  }
};

export const updateCoupon = async (couponId: string, data: Partial<{ code: string; discount: number; expiry: string }>) => {
  try {
    const response = await axios.put(`/api/walletAndCoupan/coupon/${couponId}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Update Coupon Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update coupon");
  }
};

export const applyCoupon = async (data: { code: string; rentAmount: number }) => {
  try {
    const response = await axios.post("/api/walletAndCoupan/coupon/apply", data);
    return response.data;
  } catch (error: any) {
    console.error("Apply Coupon Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to apply coupon");
  }
};

// ===================== WALLET ===================== //

export const sendBalance = async (data: { userId: string; amount: number }) => {
  try {
    const response = await axios.post("/api/walletAndCoupan/send-balance", data);
    return response.data;
  } catch (error: any) {
    console.error("Send Balance Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send balance");
  }
};

export const getAllBalanceRequests = async () => {
  try {
    const response = await axios.get("/api/walletAndCoupan/get-all-balance-request");
    return response.data;
  } catch (error: any) {
    console.error("Get Balance Requests Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch balance requests");
  }
};

export const createRedeemRequest = async (data: { amount: number }) => {
  try {
    const response = await axios.post("/api/walletAndCoupan/redeem-request", data);
    return response.data;
  } catch (error: any) {
    console.error("Create Redeem Request Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create redeem request");
  }
};

export const handleRedeemRequest = async (data: { requestId: string; status: "approved" | "rejected" }) => {
  try {
    const response = await axios.put("/api/walletAndCoupan/redeem-request/handle", data);
    return response.data;
  } catch (error: any) {
    console.error("Handle Redeem Request Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to handle redeem request");
  }}
