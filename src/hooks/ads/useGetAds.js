import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAds } from "../../apiServices/apiAds";

export function useGetAds() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const category_id = searchParams.get("category_id");
  const city_id = searchParams.get("city_id");
  const area_id = searchParams.get("area_id");
  const from_data = searchParams.get("from_data");
  const to_data = searchParams.get("to_data");
  const adult_number = searchParams.get("adult_number");
  const children_number = searchParams.get("children_number");
  const baby_number = searchParams.get("baby_number");
  const with_pits = searchParams.get("with_pits");
  const reqBody = {
    search,
    category_id,
    city_id,
    area_id,
    from_data,
    to_data,
    adult_number,
    children_number,
    baby_number,
    with_pits,
  };
  const { data: ads, isLoading } = useQuery({
    queryKey: ["ads", reqBody],
    queryFn: () => getAds(reqBody),
    staleTime: 0,
    keepPreviousData: true,
    enabled:
      !!search ||
      !!category_id ||
      !!city_id ||
      !!area_id ||
      !!from_data ||
      !!to_data ||
      !!adult_number ||
      !!children_number ||
      !!baby_number ||
      !!with_pits,
    retry: false,
  });
  return { ads, isLoading };
}
