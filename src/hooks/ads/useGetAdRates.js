import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAdRates } from "../../apiServices/apiAds";

export default function useGetAdRates() {
  const { id } = useParams();
  const { data: adRates, isLoading } = useQuery({
    queryKey: ["adRates", id],
    queryFn: () => getAdRates(id),
  });
  return { adRates, isLoading };
}
