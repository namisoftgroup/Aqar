import axiosInstance from "./../utils/axios";

export default async function getProfile() {
  try {
    const res = await axiosInstance.get("user/get_profile");
    if (res.data.code === 200) {
      return res.data.data;
    } else {
      throw new Error(res.data.message || "Error fetching profile");
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
