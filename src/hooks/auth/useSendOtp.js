import { useMutation } from "@tanstack/react-query";
import { sendOtpCode } from "../../apiServices/apiAuth";

export function useSendOtp() {
  const { mutate: sendOtp, isLoading } = useMutation({
    mutationFn: ({ phone }) => sendOtpCode({ phone }),
  });
  return { sendOtp, isLoading };
}
