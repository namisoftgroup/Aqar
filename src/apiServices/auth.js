import axiosInstance from "../utils/axios";

export async function sendOtpCode(reqBody) {
  try {
    const res = await axiosInstance.post("user/send_otp_code", reqBody);
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.response?.data?.message || "Error sending OTP code");
  }
}
export async function checkCode(reqBody) {
  try {
    const res = await axiosInstance.post("user/check_code", reqBody);
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.response?.data?.message || "Error checking code");
  }
}

export async function deleteAccount() {
  try {
    const res = await axiosInstance.post("user/delete_account");
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
