import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logout as apiLogout } from "../../apiServices/apiAuth";
import { setUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../utils/axios";

export function useLogout() {
  const dispatch = useDispatch();
  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => apiLogout(token),
    onSuccess: () => {
      dispatch(setUser({}));
      deleteCookie("token");
      deleteCookie("id");
      delete axiosInstance.defaults.headers.common["Authorization"];
      queryClient.clear();
      sessionStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR: " + error);
    },
  });

  return { logout, isLoading };
}
