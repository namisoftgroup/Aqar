import axiosInstance from "../utils/axios";

export async function getBanners() {
  try {
    const res = await axiosInstance.get("get_banners");
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
