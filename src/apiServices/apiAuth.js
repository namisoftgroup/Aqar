import axiosInstance from "../utils/axios";

export async function sendOtpCode({ phone }) {
  try {
    const res = await axiosInstance.post("user/send_otp_code", {
      phone,
    });
    const data = res.data;
    return data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Error sending OTP code");
  }
}
export async function checkCode(reqBody) {
  try {
    const res = await axiosInstance.post("user/check_code", reqBody);
    const data = res.data;
    return data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Error checking code");
  }
}

export async function logout(token) {
  try {
    const res = await axiosInstance.post("user/logout", { token });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
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
