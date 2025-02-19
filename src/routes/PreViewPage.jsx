import { useGetSettings } from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import { usePageContent } from "../hooks/settings/usePageContent";
import EmptyData from "../ui/EmptyData";

export default function PreVeiwPage({ pageType }) {
  const { settings, isLoading } = useGetSettings();
  const pageLinks = {
    terms: pageType,
    privacy: pageType,
    about: pageType,
  };
  const { pageContent, isLoading: pageLoading } = usePageContent(
    pageLinks[pageType]
  );

  if (isLoading || pageLoading) return <DataLoader />;
  if (!pageContent) return <EmptyData text="Page Not Found" />;

  return <div dangerouslySetInnerHTML={{ __html: pageContent }} />;
}
