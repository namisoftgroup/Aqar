import axiosInstance from "../utils/axios";

export async function getWalltOperation() {
  try {
    const res = await axiosInstance.get("user/get_wallet_operations");
    const data = res.data.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error fetching wallet operations");
  }
}
