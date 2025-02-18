import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../apiServices/apiBanners";

export function useGetBanners() {
  const { data: banners, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: () => getBanners(),
  });
  return { banners, isLoading };
}
