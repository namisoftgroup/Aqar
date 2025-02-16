import Gallary from "../ui/propertiesForRent/Gallary";
import { useTranslation } from "react-i18next";
import Owner from "../ui/propertiesForRent/owner";
import Features from "../ui/propertiesForRent/Features";
import PropertyInfo from "../ui/propertiesForRent/PropertyInfo";
import Rates from "../ui/propertiesForRent/Rates";
import SimilarAds from "../ui/propertiesForRent/SimilarAds";
import MapSection from "../ui/propertiesForRent/MapSection";
import useGetAdDetails from "../hooks/ads/useGetAdDetails";
import DataLoader from "../ui/DataLoader";
import { Calendar } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import { calculateNights, formatDate, formatDateRange } from "../utils/helper";
import { useSelector } from "react-redux";

export default function ForRentDetails() {
  const { t } = useTranslation();
  const { adDetails, isLoading } = useGetAdDetails();
  const [value, setValue] = useState([]);
  const { lang } = useSelector((state) => state.language.lang);
  function handleChange(selectedDates) {
    setValue(selectedDates);
  }
  const [nights, setNights] = useState(0);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    if (value.length === 2) {
      const locale = lang === "ar" ? "ar-EG" : "en-US";
      const fromReadableDate = formatDateRange(value[0], value[1], locale);
      const nightsCount = calculateNights(value[0], value[1]);
      setDateRange({ from: fromReadableDate });
      setNights(nightsCount);
    }
  }, [value, lang]);

  return (
    <>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="for-rent-details">
          <section className="container">
            <Gallary images={adDetails.images} />
            <div className="row">
              <div className="col-8">
                <Owner owner={adDetails?.user} />
                <div className="description">
                  <h4>{t("forRent.desc")}</h4>
                  <p>{adDetails.description}</p>
                </div>
                <Features features={adDetails.features} />
                <div className="mt-3">
                  <h4>{t("forRent.desc")}</h4>
                  <div className="calender-container">
                    <Calendar
                      range
                      numberOfMonths={2}
                      format="YYYY/MM/DD"
                      className="custom-calendar"
                      value={value}
                      onChange={handleChange}
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <PropertyInfo adDetails={adDetails} nights={nights} />
              </div>
            </div>
            <div className="map-container">
              <h4>{t("forRent.location")}</h4>
              <p>شارع الحمسه،حي الرياض،</p>
              <MapSection
                properties={[
                  {
                    position: { lat: adDetails.lat, lng: adDetails.lang },
                    price: adDetails.price,
                  },
                ]}
              />
            </div>
            {adDetails.rates && adDetails.rates.length > 0 && <Rates />}
            {adDetails.similar_ads && adDetails.similar_ads.length > 0 && (
              <SimilarAds similarAds={adDetails.similar_ads} />
            )}
          </section>
        </section>
      )}
    </>
  );
}
