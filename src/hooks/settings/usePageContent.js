import { useQuery } from "@tanstack/react-query";
import { getPageContent } from "../../apiServices/apiSetting";

export function usePageContent(url) {
  const { data: content, isLoading } = useQuery({
    queryKey: ["pageContent", url],
    queryFn: () => getPageContent(url),
    enabled: !!url,
  });

  return { content, isLoading };
}
