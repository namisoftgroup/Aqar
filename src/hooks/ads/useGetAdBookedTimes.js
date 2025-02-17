import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAdBookedTimes } from "../../apiServices/apiAds";

export default function useGetAdBookedTimes() {
  const { id } = useParams();
  const { data: adRates, isLoading } = useQuery({
    queryKey: ["adRates", id],
    queryFn: () => getAdBookedTimes(id),
  });
  return { adRates, isLoading };
}
