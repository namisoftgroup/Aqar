import { useMutation } from "@tanstack/react-query";
import { bookingAd as apiBookingAd } from "../../apiServices/apiBooking";

export function useBookingAd() {
  const { mutate: bookingAd, isPending } = useMutation({
    mutationFn: (reqBody) => apiBookingAd(reqBody),
  });

  return { bookingAd, isPending };
}
