import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../redux/slices/userSlice";
import { toast } from "sonner";

export function useLogout() {
  const dispatch = useDispatch();
  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("user/logout", {
        token,
      });

      if (res.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(setUser({}));
        queryClient.clear();
        sessionStorage.clear();
        toast.success("Logged out successfully!");
      }
    } catch (e) {
      toast(`Error during logout:: ${e.message}`);
    }
  };

  return handleLogout;
}
