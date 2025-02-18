import axiosInstance from "../utils/axios";

export async function getFavorites() {
  try {
    const res = await axiosInstance.get("user/get_favorites");
    const data = res.data.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error fetching favorites");
  }
}
export async function addFavourite(id) {
  try {
    const res = await axiosInstance.post("user/add_to_favorite", { id });
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error adding to favorites");
  }
}
export async function deleteFavourite(id) {
  try {
    const res = await axiosInstance.post("user/delete_from_favorite", { id });
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error deleting from favorites");
  }
}
