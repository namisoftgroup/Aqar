import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useGetAdDetails from "../hooks/ads/useGetAdDetails";
import { useAddToFavorites } from "../hooks/favorites/useAddToFavorites";
import { useDeleteFromFavorites } from "../hooks/favorites/useDeleteFromFavorites";
import DataLoader from "../ui/DataLoader";
import MapView from "../ui/MapView";
import Features from "../ui/PropertiesForRent/Features";
import Gallary from "../ui/PropertiesForRent/Gallary";
import Owner from "../ui/PropertiesForRent/Owner";
import PropertyInfo from "../ui/PropertiesForRent/PropertyInfo";
import Rates from "../ui/PropertiesForRent/Rates";
import SimilarAds from "../ui/PropertiesForRent/SimilarAds";
import useGetAdRates from "../hooks/ads/useGetAdRates";

export default function ForRentDetails() {
  const { t } = useTranslation();
  const booking = useSelector((state) => state.booking);
  // const dispatch = useDispatch();
  // const { id } = useParams();
  const navigate = useNavigate();
  const { deleteFromFavorites } = useDeleteFromFavorites();
  const { addToFavorites } = useAddToFavorites();
  const { adDetails, isLoading } = useGetAdDetails();
  // const { adRates, isLoading: isRatesLoading } = useGetAdRates(id);
  // const storedDates =
  //   booking.from && booking.to
  //     ? [new Date(booking.from), new Date(booking.to)]
  //     : [];

  // const [selectedDates, setSelectedDates] = useState(storedDates);

  // function handleChange(dates) {
  //   const serializedDates = dates.map((date) => new Date(date).toISOString());
  //   setSelectedDates(dates);
  //   if (dates.length === 2) {
  //     dispatch(setDates({ from: serializedDates[0], to: serializedDates[1] }));
  //   }
  // }

  if (isLoading) return <DataLoader />;

  return (
    <section className="for-rent-details">
      <section className="container">
        <div className="row">
          <div className="col-lg-8 col-12 p-2">
            <div className="details-header-section">
              <div className="title-wrapper">
                <button onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
                <h3>{t("adDetails")} </h3>
              </div>
              <div className="header-icons">
                <div
                  className="fav-btn"
                  onClick={() => {
                    adDetails.is_favorite
                      ? deleteFromFavorites(adDetails.id)
                      : addToFavorites(adDetails.id);
                  }}
                >
                  {adDetails.is_favorite ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-light fa-heart"></i>
                  )}
                </div>
              </div>
            </div>
            <Gallary images={adDetails.images} />
          </div>
          <div className="col-lg-4 col-12 p-2">
            <Owner ad={adDetails} />
            <PropertyInfo adDetails={adDetails} nights={booking.nights} />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="description">
              <h4>{t("forRent.desc")}</h4>
              <p>{adDetails.description}</p>
            </div>{" "}
            <div className="details-card">
              {adDetails.filters &&
                adDetails.features.length > 0 &&
                adDetails.filters.map((item) => (
                  <div className="detail-item" key={item.id}>
                    <div className="d-flex gap-1">
                      <img
                        src={
                          item.filter.icon
                            ? item.filter.icon
                            : "/icons/check.png"
                        }
                        alt={item.filter.name}
                        className="icon"
                      />
                      <span>{item.filter.name}</span>
                    </div>
                    <span>
                      {item.value === "yes" || item.value === "true"
                        ? "متوفر"
                        : item.value}
                    </span>
                  </div>
                ))}
            </div>
            {adDetails.features && adDetails.features.length > 0 && (
              <Features features={adDetails.features} />
            )}
          </div>
        </div>
        <div className="map-container">
          <h4>{t("forRent.location")}</h4>
          <p>{adDetails.address} </p>
          <MapView lng={adDetails.lng} lat={adDetails.lat} />
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
