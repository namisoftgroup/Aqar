import axiosInstance from "../utils/axios";

export async function bookingAd(reqbody) {
  try {
    const res = await axiosInstance.post("user/book_ad", reqbody);
    return res.data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || "Failed to book the ad. Please try again."
    );
  }
}

export async function getBookings() {
  try {
    const res = await axiosInstance.get("user/get_booking");
    return res.data.data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || "Failed to fetch bookings. Please try again."
    );
  }
}

export async function getBookingDeatils(id) {
  try {
    const res = await axiosInstance.post("user/get_booking_details", { id });
    return res.data.data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        "Failed to fetch booking details. Please try again."
    );
  }
}

export async function addBookingRate(reqBody) {
  try {
    const res = await axiosInstance.post("user/create_rate", reqBody);
    return res.data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        "Failed to add booking rate. Please try again."
    );
  }
}
