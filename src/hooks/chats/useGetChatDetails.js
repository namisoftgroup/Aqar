import { useQuery } from "@tanstack/react-query";
import { getChatDetails } from "../../apiServices/apiChats";

export function useGetChatDetails(reqBody) {
  const { data: chatDetails, isLoading } = useQuery({
    queryKey: ["chatDetails", reqBody],
    queryFn: () => getChatDetails(reqBody),
  });

  return { chatDetails, isLoading };
}
