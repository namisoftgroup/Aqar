import axiosInstance from "../utils/axios";

export async function getAds(reqbody) {
  try {
    const res = await axiosInstance.post("get_ads", reqbody);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching ads:", error);
  }
}
export async function getAdDetails(id) {
  try {
    const res = await axiosInstance.post("get_ad_details", { id });
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching ads:", error);
  }
}
