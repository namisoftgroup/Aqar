import { useState } from "react";
import PropertyCard from "../ui/cards/PropertyCard";
import { useTranslation } from "react-i18next";
import MapSection from "../ui/propertiesForRent/MapSection";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      {viewMap ? (
        <MapSection />
      ) : (
        <section className="container py-5">
          <div className="row g-3">
            {Array(18)
              .fill()
              .map((_, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <PropertyCard />
                </div>
              ))}
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
