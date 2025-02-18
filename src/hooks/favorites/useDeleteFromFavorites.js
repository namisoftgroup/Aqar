import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavourite } from "../../apiServices/apiFavorites";
import { toast } from "sonner";

export function useDeleteFromFavorites() {
  const querClient = useQueryClient();
  const { mutate: deleteFromFavorites, isPending } = useMutation({
    mutationFn: (id) => deleteFavourite(id),
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success(data.message);
        querClient.invalidateQueries(["ads", "favorites", "bookings"]); 
      } else if (data.code === 422) {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Error deleting from favorites: ", error);
    },
  });

  return { deleteFromFavorites, isPending };
}
