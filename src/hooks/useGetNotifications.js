import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../apiServices/apiNotifications";

export function useGetNotifications() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  return { notifications, isLoading };
}
