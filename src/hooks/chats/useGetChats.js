import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../apiServices/apiChats";

export function useGetChats() {
  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(),
  });
  return { chats, isLoading };
}
