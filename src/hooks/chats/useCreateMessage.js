import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as apiCreateMessage } from "../../apiServices/apiChats";

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { mutate: createMessage, isPending } = useMutation({
    mutationFn: (data) => apiCreateMessage(data),
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries([
        "chats",
        "chatDetails",
        {
          ad_id: sessionStorage.getItem("ad_id"),
          owner_id: sessionStorage.getItem("owner_id"),
          user_id: sessionStorage.getItem("user_id"),
          orderBy: "asc",
        },
      ]);
    },
    onError: (error) => {
      console.log("ERROR: " + error);
    },
  });
  return { createMessage, isPending };
}
