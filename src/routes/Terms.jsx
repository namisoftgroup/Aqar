import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import { useState } from "react";

export default function Terms() {
  const { t } = useTranslation();

  const [termsContent, setTermsContent] = useState();
  return (
    <section className="terms">
      <SectionHeader link={t("header.terms")} className="terms-background" />
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: termsContent }} />
      </div>
    </section>
  );
}
