import { useMutation } from "@tanstack/react-query";
import { addBookingRate as apiAddBookingRate } from "../../apiServices/apiBooking";

export default function useAddBookingRate() {
  const { mutate: addBookingRate, isLoading } = useMutation({
    mutationFn: ({ rate, booking_id, comment }) =>
      apiAddBookingRate({ rate, booking_id, comment }),
  });

  return { addBookingRate, isLoading };
}
