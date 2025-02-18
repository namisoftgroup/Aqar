import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../apiServices/apiFavorites";

export function useGetFavorites() {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  return { favorites, isLoading };
}
