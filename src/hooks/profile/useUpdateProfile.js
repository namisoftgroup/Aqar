import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../apiServices/apiProfile";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useUpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: (data) => {
      if (data.code === 200) {
        dispatch(setUser(data.data));
        navigate("/profile");
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries(["profile", "chats", "chatDetails"]);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { editProfile, isPending };
}
