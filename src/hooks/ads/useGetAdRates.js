import { useQuery } from "@tanstack/react-query";
import { getAdRates } from "../../apiServices/apiAds";

export default function useGetAdRates(id) {
  const { data: adRates, isLoading } = useQuery({
    queryKey: ["adRates", id],
    queryFn: () => getAdRates(id),
    enabled: !!id,
  });
  return { adRates, isLoading };
}
