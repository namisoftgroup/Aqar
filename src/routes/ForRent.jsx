import { useEffect, useState } from "react";
import PropertyCard from "../ui/cards/PropertyCard";
import { useTranslation } from "react-i18next";
import MapSection from "../ui/PropertiesForRent/MapSection";
import FilterBox from "../ui/home/FilterBox";
import { useGetAds } from "../hooks/ads/useGetAds";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import CustomPagination from "../ui/CustomPagination";
import Aos from "aos";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);
  const { t } = useTranslation();
  const { ads, isLoading } = useGetAds();
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      <FilterBox />
      {viewMap ? (
        <MapSection
          properties={ads?.data?.map((ad) => ({
            position: { lat: ad.lat, lng: ad.lang },
            price: ad.price,
          }))}
        />
      ) : isLoading ? (
        <DataLoader />
      ) : (
        <section className="container py-5">
          <div className="row g-3">
            {ads.data && ads.data.length > 0 ? (
              <>
                {ads.data.map((ad, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-6 col-lg-4 col-xxl-3"
                    data-aos="fade-up"
                  >
                    <PropertyCard ad={ad} />
                  </div>
                ))}
                {ads && ads?.total > 10 && (
                  <CustomPagination count={ads?.total} pageSize={10} />
                )}
              </>
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
