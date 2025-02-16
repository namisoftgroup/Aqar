import { useQuery } from "@tanstack/react-query";
import { getCcategories } from "../../apiServices/apiCategories";

export function useGetCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCcategories,
  });
  return { categories, isLoading };
}
