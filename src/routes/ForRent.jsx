import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAds } from "../hooks/ads/useGetAds";
import CustomPagination from "../ui/CustomPagination";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import PropertyCard from "../ui/cards/PropertyCard";
import FilterBox from "../ui/home/FilterBox";
import MapSection from "../ui/PropertiesForRent/MapSection";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);
  const { t } = useTranslation();
  const { ads, isLoading } = useGetAds();

  return (
    <>
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
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-12 p-2">
                <FilterBox />
              </div>
              {ads.data && ads.data.length > 0 ? (
                <>
                  {ads.data.map((ad, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 p-2">
                      <PropertyCard ad={ad} className="bg_gray" />
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
