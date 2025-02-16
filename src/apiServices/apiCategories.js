import axiosInstance from "../utils/axios";

export async function getCcategories() {
  try {
    const res = await axiosInstance.get("/get_categories");
    const data = res.data.data;

    return data;
  } catch (e) {
    console.error("Error fetching categories:", e.message);
    throw new Error("Error fetching categories");
  }
}
