import { useQuery } from "@tanstack/react-query";
import { getAreas } from "../apiServices/apiCities";

export function useGetAreas(id, enabled) {
  const { data: areas, isLoading } = useQuery({
    queryKey: ["areas", id],
    queryFn: () => getAreas(id),
    enabled,
  });

  return { areas, isLoading };
}
