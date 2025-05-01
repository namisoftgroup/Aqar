import { useMutation } from "@tanstack/react-query";
import { sendContact as apiSendContact } from "../apiServices/apiContact";

export function useSendContact() {
  const {
    mutate: sendContact,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: apiSendContact,
  });
  return {
    sendContact,
    isPending,
    isError,
    error,
    isSuccess,
  };
}
