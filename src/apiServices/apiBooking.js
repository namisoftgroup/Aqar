import axiosInstance from "../utils/axios";

export async function bookingAd(reqbody) {
  try {
    const res = await axiosInstance.post("user/book_ad", reqbody);
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error booking ad");
  }
}
export async function getBookings() {
  try {
    const res = await axiosInstance.get("user/get_booking");
    const data = res.data.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error booking ad");
  }
}
export async function getBookingDeatils(id) {
  try {
    const res = await axiosInstance.post("user/get_booking_details", { id });
    const data = res.data.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error booking ad");
  }
}
export async function addBookingRate(reqBody) {
  try {
    const res = await axiosInstance.post("user/create_rate", reqBody);
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Error booking ad");
  }
}
