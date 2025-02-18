import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../apiServices/apiBooking";

export function useGetBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { bookings, isLoading };
}
