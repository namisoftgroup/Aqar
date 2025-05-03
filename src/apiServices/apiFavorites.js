import axiosInstance from "../utils/axios";

export async function getFavorites() {
  try {
    const res = await axiosInstance.get("user/get_favorites");
    const data = res.data.data;
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || "Error fetching favorites. Please try again."
    );
  }
}

export async function addFavourite(id) {
  try {
    const res = await axiosInstance.post("user/add_to_favorite", { id });
    const data = res.data;
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        "Error adding to favorites. Please try again."
    );
  }
}

export async function deleteFavourite(id) {
  try {
    const res = await axiosInstance.post("user/delete_from_favorite", {
      ad_id: id,
    });
    const data = res.data;
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        "Error deleting from favorites. Please try again."
    );
  }
}
