import { useTranslation } from "react-i18next";
import { useGetSettings } from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/SectionHeader";
export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const { settings, isLoading } = useGetSettings();
  if (isLoading) return <DataLoader />;
  return (
    <section className="terms">
      <SectionHeader
        link={t("header.privacy")}
        className="privacy-background"
      />
      <div className="container my-4">
        <div dangerouslySetInnerHTML={{ __html: settings.privacy }} />
      </div>
    </section>
  );
}
