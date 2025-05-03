import { useQuery } from "@tanstack/react-query";
import { getAdRates } from "../../apiServices/apiAds";
import { useSearchParams } from "react-router";

export default function useGetAdRates(id, refetchPage) {
  const [searchParams] = useSearchParams();

  const page = refetchPage
    ? refetchPage
    : Number(searchParams.get("page")) || 1;
  const { data: adRates, isLoading } = useQuery({
    queryKey: ["adRates", id, page],
    queryFn: () => getAdRates(id, page),
    enabled: !!id,
  });
  return { adRates, isLoading };
}
