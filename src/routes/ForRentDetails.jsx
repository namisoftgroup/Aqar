import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { setDates } from "../redux/slices/bookingSlice";
import useGetAdDetails from "../hooks/ads/useGetAdDetails";
import DataLoader from "../ui/DataLoader";
import Features from "../ui/PropertiesForRent/Features";
import Gallary from "../ui/PropertiesForRent/Gallary";
import MapSection from "../ui/PropertiesForRent/MapSection";
import PropertyInfo from "../ui/PropertiesForRent/PropertyInfo";
import Rates from "../ui/PropertiesForRent/Rates";
import SimilarAds from "../ui/PropertiesForRent/SimilarAds";
import Owner from "../ui/PropertiesForRent/Owner";

export default function ForRentDetails() {
  const { t } = useTranslation();
  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const { adDetails, isLoading } = useGetAdDetails();

  const storedDates =
    booking.from && booking.to
      ? [new Date(booking.from), new Date(booking.to)]
      : [];

  const [selectedDates, setSelectedDates] = useState(storedDates);

  function handleChange(dates) {
    const serializedDates = dates.map((date) => new Date(date).toISOString());
    setSelectedDates(dates);
    if (dates.length === 2) {
      dispatch(setDates({ from: serializedDates[0], to: serializedDates[1] }));
    }
  }

  if (isLoading) return <DataLoader />;

  return (
    <section className="for-rent-details">
      <section className="container">
        <div className="row">
          <div className="col-lg-8 col-12 p-2">
            <Gallary images={adDetails.images} />
          </div>
          <div className="col-lg-4 col-12 p-2">
            <Owner owner={adDetails?.user} />
            <PropertyInfo adDetails={adDetails} nights={booking.nights} />
          </div>
        </div>
      

        <div className="row g-3">
          <div className="col-lg-8">
            

            <div className="description">
              <h4>{t("forRent.desc")}</h4>
              <p>{adDetails.description}</p>
            </div>

            {adDetails.features && adDetails.features.length > 0 && (
              <Features features={adDetails.features} />
            )}

            <div className="mt-3">
              <h4>{t("forRent.chooseData")}</h4>
              <div className="calender-container">
                <Calendar
                  range
                  numberOfMonths={2}
                  format="YYYY/MM/DD"
                  className="custom-calendar"
                  value={selectedDates}
                  onChange={handleChange}
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="map-container">
          <h4>{t("forRent.location")}</h4>
          <p>{adDetails.address} </p>
          <MapSection
            properties={[
              {
                position: { lat: adDetails.lat, lng: adDetails.lang },
                price: adDetails.price,
              },
            ]}
          />
        </div>

        {adDetails.rates && adDetails.rates.length > 0 && (
          <Rates adRates={adDetails.rates} />
        )}

        {adDetails.similar_ads && adDetails.similar_ads.length > 0 && (
          <SimilarAds similarAds={adDetails.similar_ads} />
        )}
      </section>
    </section>
  );
}
