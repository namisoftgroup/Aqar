import { useQuery } from "@tanstack/react-query";
import { getWalltOperation } from "../../apiServices/wallet";

export function useGetWalletOperations() {
  const { data: walletOperations, isLoading } = useQuery({
    queryKey: ["walletOperations"],
    queryFn: getWalltOperation,
  });
  return { walletOperations, isLoading };
}
