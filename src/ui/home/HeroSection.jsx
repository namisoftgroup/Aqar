import { useTranslation } from "react-i18next";
import FilterBox from "./FilterBox";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 p-2">
            <h1>{t("home.searchForYourDreamHome")}</h1>
            <p>{t("home.searchForYourDreamHomeDesc")}</p>
          </div>
          <div className="col-lg-10 col-12 p-2">
            <FilterBox />
          </div>
        </div>
      </div>
    </section>
  );
}
