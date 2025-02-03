import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 p-2 mb-3">
            <h1>{t("home.searchForYourDreamHome")}</h1>
            <p>{t("home.searchForYourDreamHomeDesc")}</p>
          </div>
          <div className="col-sm-6 p-2"></div>
        </div>
      </div>
    </section>
  );
}
