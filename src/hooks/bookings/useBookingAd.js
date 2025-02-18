import { QueryClient, useMutation } from "@tanstack/react-query";
import { bookingAd as apiBookingAd } from "../../apiServices/apiBooking";
import { toast } from "sonner";

export function useBookingAd() {
  const { mutate: bookingAd, isLoading } = useMutation({
    mutationFn: (reqBody) => apiBookingAd(reqBody),

    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Booking successful!");
        QueryClient.invalidateQueries(["ads"]);
      } else if (data.code === 500) {
        toast.error(data.message);
      }
    },
  });

  return { bookingAd, isLoading };
}
