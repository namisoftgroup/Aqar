import { useTranslation } from "react-i18next";
import FilterBox from "./FilterBox";
import { useGetBanners } from "../../hooks/useGetBanners";
import DataLoader from "../DataLoader";

export default function HeroSection() {
  const { t } = useTranslation();
  // const { banners, isLoading } = useGetBanners();

  // if (isLoading) return <DataLoader />;
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 p-2 mb-3">
            <h1>{t("home.searchForYourDreamHome")}</h1>
            <p>{t("home.searchForYourDreamHomeDesc")}</p>
            <FilterBox />
          </div>
          <div className="col-sm-6 p-2"></div>
        </div>
      </div>
    </section>
  );
}
