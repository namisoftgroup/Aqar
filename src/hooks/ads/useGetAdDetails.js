import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAdDetails } from "../../apiServices/apiAds";

export default function useGetAdDetails() {
  const { id } = useParams();
  const { data: adDetails, isLoading } = useQuery({
    queryKey: ["adDetails", id],
    queryFn: () => getAdDetails(id),
  });

  return { adDetails, isLoading };
}
