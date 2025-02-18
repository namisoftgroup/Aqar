import axiosInstance from "../utils/axios";

export async function getCities() {
  try {
    const res = await axiosInstance.get("get_cities");
    const data = res.data.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getAreas(id) {
  try {
    const res = await axiosInstance.get(`get_areas/${id}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
