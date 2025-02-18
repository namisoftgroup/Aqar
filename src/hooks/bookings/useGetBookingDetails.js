import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBookingDeatils } from "../../apiServices/apiBooking";

export default function useGetBookingDetails() {
  const { id } = useParams();
  const { data: bookingDetails, isLoading } = useQuery({
    queryKey: ["bookingDetails", id],
    queryFn: () => getBookingDeatils(id),
  });
  return { bookingDetails, isLoading };
}
