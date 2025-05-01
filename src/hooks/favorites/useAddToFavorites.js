import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addFavourite } from "../../apiServices/apiFavorites";

export function useAddToFavorites() {
  const querClient = useQueryClient();
  const { mutate: addToFavorites, isPending } = useMutation({
    mutationFn: (id) => addFavourite(id),
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success(data.message);
        querClient.invalidateQueries([
          "ads",
          "favorites",
          "bookings",
          "adDetails",
        ]);
      } else if (data.code === 422) {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Error adding to favorites: ", error);
      toast.error(error.message);
    },
  });
  return { addToFavorites, isPending };
}
