import axiosInstance from "../utils/axios";

export async function getNotifications() {
  try {
    const res = await axiosInstance.get("get_notification");
    const data = res.data.data;
    return data;
  } catch (e) {
    console.error("Error fetching notifications:", e.message);
    throw new Error("Error fetching notifications");
  }
}
