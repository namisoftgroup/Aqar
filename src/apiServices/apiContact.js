import axiosInstance from "../utils/axios";

export async function sendContact({ name, email, phone, message }) {
  try {
    const res = await axiosInstance.post("contact_us", {
      name,
      email,
      phone,
      message,
    });
    const data = res.data;
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || "Failed to send contact message"
    );
  }
}
