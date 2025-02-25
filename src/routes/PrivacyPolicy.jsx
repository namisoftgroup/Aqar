import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import { useState } from "react";
export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const [privacyContent, setPrivacyContent] = useState();
  return (
    <section className="terms">
      <SectionHeader
        link={t("header.privacy")}
        className="privacy-background"
      />
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
      </div>
    </section>
  );
}
