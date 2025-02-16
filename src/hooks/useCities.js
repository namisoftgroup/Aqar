import { useQuery } from "@tanstack/react-query";
import { getCities } from "../apiServices/apiCities";

export function useGetCities() {
  const { isLoading, data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities, isLoading };
}
