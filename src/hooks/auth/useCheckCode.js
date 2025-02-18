import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkCode as apiCheckCode } from "../../apiServices/apiAuth";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";
import { closeAuthModal, setStep } from "../../redux/slices/authModalSlice";
import { setUser } from "../../redux/slices/userSlice";

export function useCheckCode() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; samesite=strict`;
  };

  const { mutate: checkCode, isPending } = useMutation({
    mutationFn: ({ code, phone, hashed_code, login }) =>
      apiCheckCode({ code, phone, hashed_code, login }),
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      queryClient.setQueryData(["profile"], data.data);
      setCookie("id", data.data.id, 365);
      setCookie("token", data.data.token, 365);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `${data.data.token}`;

      toast.success("Login success");

      if (data.data.name === null) {
        dispatch(setStep(3));
      } else {
        dispatch(closeAuthModal());
      }
    },
    onError: (error) => {
      console.error("ERROR:", error);
      toast.error("Login failed");
    },
  });

  return { checkCode, isPending };
}
