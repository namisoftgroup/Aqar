import { useQuery } from "@tanstack/react-query";
import { getAdPriceRange } from "../../apiServices/apiAds";

export default function useGetPriceAdRange() {
  const { data: ranges, isLoading } = useQuery({
    queryKey: ["getAdPriceRange"],
    queryFn: getAdPriceRange,
  });
  return { ranges, isLoading };
}
