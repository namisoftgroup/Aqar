import { Link } from "react-router";
import PropertyCard from "../cards/PropertyCard";
import { useTranslation } from "react-i18next";
import { useGetAds } from "../../hooks/ads/useGetAds";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";

export default function RentSection() {
  const { t } = useTranslation();
  const { ads, isLoading } = useGetAds();

  if (isLoading) {
    return <DataLoader />;
  }
  return (
    <section className="rent-section">
      <div className="container">
        <div className="section-header ">
          <div>
            <h2>{t("home.forRentUnits")}</h2>
            <p>{t("home.forRentUnitsdes")}</p>
          </div>
          <Link to={"for-rent"}>{t("home.viewAll")}</Link>
        </div>

        <div className="row">
          {ads.data && ads.data.length > 0 ? (
            ads.data.map((ad) => (
              <div key={ad.id} className="col-lg-4 col-md-6 col-12 p-2">
                <PropertyCard ad={ad} />
              </div>
            ))
          ) : (
            <EmptyData text={t("forRent.noDatafound")} />
          )}
        </div>
      </div>
    </section>
  );
}
