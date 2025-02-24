import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function SectionHeader({ link }) {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  return (
    <div className={`  ${lang === "ar" ? "ar" : " "}   main-section-header `}>
      <div className="container z-1">
        <div className="main-section-title">
          <Breadcrumb>
            <Breadcrumb.Item href="/">{t("contact.home")}</Breadcrumb.Item>
            <Breadcrumb.Item className={`${lang === "ar" ? "ar" : " "}`} active>
              {link}
            </Breadcrumb.Item>
          </Breadcrumb>
          <h2>{link}</h2>
        </div>
      </div>
    </div>
  );
}
