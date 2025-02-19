import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../apiServices/apiSetting";

export function useGetSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isLoading };
}
