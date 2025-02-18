import { useQuery } from "@tanstack/react-query";
import getProfile from "../../apiServices/apiProfile";

export default function useGetProfile(enabled) {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled,
    retry: false,
  });
  return { profile, isLoading, error, refetch, isFetched };
}
