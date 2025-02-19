import axiosInstance from "../utils/axios";

export async function getSettings() {
  try {
    const res = await axiosInstance.get("get_settings");
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
}

export async function getPageContent(url) {
  try {
    const res = await axiosInstance.get(url, { responseType: "text" });
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
}
