import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { setUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../utils/axios";

export default function useDeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("user/delete_account");
      if (res.data.code === 200) {
        dispatch(setUser({}));
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        queryClient.clear();
        sessionStorage.clear();
        navigate("/");
        toast.success("account successfully deleted");
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.error("Error deleting account: ", e);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAccount, isLoading };
}
