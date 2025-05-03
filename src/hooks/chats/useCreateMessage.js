import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as apiCreateMessage } from "../../apiServices/apiChats";
import { toast } from "sonner";

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { mutate: createMessage, isPending } = useMutation({
    mutationFn: (data) => apiCreateMessage(data),
    onSuccess: () => {
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
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send the message. Please try again.";
      toast.error(errorMessage);
    },
  });
  return { createMessage, isPending };
}
