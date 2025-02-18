import { useMutation } from "@tanstack/react-query";
import { sendOtpCode } from "../../apiServices/apiAuth";

export function useSendOtp() {
  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: ({ phone }) => sendOtpCode({ phone }),
  });
  console.log("isLoading from useSendOtp:", isPending); // Debugging
  return { sendOtp, isPending };
}
