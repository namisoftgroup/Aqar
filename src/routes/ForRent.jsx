import { useState } from "react";
import PropertyCard from "../ui/cards/PropertyCard";
import { useTranslation } from "react-i18next";
import MapSection from "../ui/propertiesForRent/MapSection";
import FilterBox from "../ui/home/FilterBox";
import { useGetAds } from "../hooks/ads/useGetAds";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);
  const { t } = useTranslation();
  const { ads, isLoading } = useGetAds();

  return (
    <>
      {" "}
      <FilterBox />
      {viewMap ? (
        <MapSection
          properties={ads.map((ad) => ({
            position: { lat: ad.lat, lng: ad.lang },
            price: ad.price,
          }))}
        />
      ) : isLoading ? (
        <DataLoader />
      ) : (
        <section className="container py-5">
          <div className="row g-3">
            {ads && ads.length > 0 ? (
              ads.map((ad, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <PropertyCard ad={ad} />
                </div>
              ))
            ) : (
              <EmptyData text={t("forRent.noDatafound")} />
            )}
          </div>
        </section>
      )}
      <button className="view-map" onClick={() => setViewMap((view) => !view)}>
        <div className="icon">
          <img
            src={viewMap === false ? "/icons/map.svg" : "/icons/listing.svg"}
            alt="map"
          />
        </div>
        {viewMap === false ? t("forRent.viewOnMap") : t("forRent.list")}
      </button>
    </>
  );
}
