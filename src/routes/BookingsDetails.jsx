import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetBookingDetails from "../hooks/bookings/useGetBookingDetails";
import AddRate from "../ui/AddRate";
import DataLoader from "../ui/DataLoader";
import ProgressBar from "../ui/ProgressBar";
import Gallary from "../ui/PropertiesForRent/Gallary";
import Owner from "../ui/PropertiesForRent/Owner";
import {
  BOOKING_STATUS_AR,
  BOOKING_STATUS_EN,
  PER_AR,
  PER_EN,
} from "../utils/constants";
import { calculateNights, formateDateDetails } from "../utils/helper";
import MapView from "../ui/MapView";
import Features from "../ui/PropertiesForRent/Features";

export default function BookingsDetails() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  const { bookingDetails, isLoading } = useGetBookingDetails();

  const [total, setTotal] = useState(0);

  const nights = useMemo(() => {
    if (!bookingDetails?.ad?.from || !bookingDetails?.ad?.to) return 0;
    return calculateNights(
      new Date(bookingDetails?.ad?.from),
      new Date(bookingDetails?.ad?.to)
    );
  }, [bookingDetails?.ad?.from, bookingDetails?.ad?.to]);

  useEffect(() => {
    if (bookingDetails?.ad?.price && bookingDetails?.ad?.clean_price) {
      setTotal(
        (nights === 0 ? 1 : nights) * bookingDetails?.ad?.price +
          bookingDetails?.ad?.clean_price
      );
    }
  }, [nights, bookingDetails?.ad?.price, bookingDetails?.ad?.clean_price]);

  if (isLoading) return <DataLoader />;
  return (
    <section className="for-rent-details">
      <section className="container">
        {/* Gallery Section */}
        <div className="bookings-details__gallery">
          <Gallary images={bookingDetails.ad.images} />
        </div>

        {/* Main Details Section */}
        <div className="row g-3 bookings-details__main">
          <div className="col-md-7">
            <div className="order-prop-details">
              <h3 className="order-prop-details__title">
                {bookingDetails.ad.title}
              </h3>
              <p className="order-prop-details__price">
                {bookingDetails.ad.price} {t("sar")} /{" "}
                {lang === "ar"
                  ? PER_AR[bookingDetails.ad.per]
                  : PER_EN[bookingDetails.ad.per]}
              </p>
              <p className="order-prop-details__price">
                {bookingDetails.ad.address}
              </p>
              <ProgressBar status={bookingDetails.status} />
              <div className="order-status">
                <span>{t("book.bookingStatus")}</span>
                <span
                  className={`booking-status-label ${bookingDetails.status}`}
                >
                  {lang === "ar"
                    ? BOOKING_STATUS_AR[bookingDetails.status]
                    : BOOKING_STATUS_EN[bookingDetails.status]}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5 ">
            <Owner ad={bookingDetails.ad} />
          </div>
        </div>

        {/* Property Data Section */}
        <section className=" border-0 prop-data">
          <div className="details-card">
            <h4 className="your-trip__title">{t("book.yourTrip")}</h4>
            {bookingDetails.ad.filters &&
              bookingDetails.ad.filters.length > 0 &&
              bookingDetails.ad.filters.map((item) => (
                <div className="detail-item" key={item.id}>
                  <div className="detail-item__content d-flex gap-1">
                    <img
                      src={
                        item.filter.icon ? item.filter.icon : "/images/check.png"
                      }
                      alt={item.filter.name}
                      className="detail-item__icon"
                    />
                    <span className="detail-item__name">
                      {item.filter.name}
                    </span>
                  </div>
                  <span className="detail-item__value">
                    {item.value === "yes" || item.value === "true"
                      ? "متوفر"
                      : item.value}
                  </span>
                </div>
              ))}
          </div>
          {bookingDetails.ad.features &&
            bookingDetails.ad.features.length > 0 && (
              <Features features={bookingDetails.ad.features} />
            )}

          {/* Trip Details */}
          <div className="your-trip">
            <h4 className="your-trip__title">{t("book.yourTrip")}</h4>
            <div className="date">
              <span className="your-trip__label">{t("book.dates")}</span>
              <span className="your-trip__value">
                {formateDateDetails(bookingDetails.from, locale)} -{" "}
                {formateDateDetails(bookingDetails.to, locale)}
              </span>
            </div>
            <div className="guest">
              <span className="your-trip__label">{t("book.guestsNumber")}</span>
              <span className="your-trip__value">
                {bookingDetails.adults +
                  bookingDetails.children +
                  bookingDetails.baby}
              </span>
            </div>
          </div>

          {/* Rent Payments */}
          {bookingDetails.ad.payments &&
            bookingDetails.ad.payments.length > 0 && (
              <div className="rent-payment">
                <h3 className="rent-payment__title">
                  {t("forRent.rentPayments")}
                </h3>
                <div className="rent-payment__list">
                  {bookingDetails.ad.payments.map((payment) => (
                    <p className="rent-payment__item" key={payment.id}>
                      <span className="rent-payment__price">
                        {payment.price}
                      </span>{" "}
                      {t("sar")} {payment.description}
                    </p>
                  ))}
                </div>
              </div>
            )}

          {/* Price Details */}
          <div className="price">
            <h3 className="price__title">{t("forRent.price")}</h3>
            <div className="price__details">
              {nights > 0 ? (
                <p className="price__nights">
                  {nights} {t("forRent.nights")}
                </p>
              ) : (
                <p className="price__night-label">سعر الليله</p>
              )}
              <p className="price__amount">
                {bookingDetails.ad.price} {t("sar")} /{" "}
                {lang === "ar"
                  ? PER_AR[bookingDetails.ad.per]
                  : PER_EN[bookingDetails.ad.per]}
              </p>
            </div>
            <div className="price__cleaning">
              <p className="price__label">{t("forRent.cleanPrice")}</p>
              <p className="price__amount">
                {bookingDetails.ad.clean_price} {t("sar")}
              </p>
            </div>
            <div className="price__total">
              <p className="price__label">{t("forRent.totalPrice")}</p>
              <p className="price__amount">{total}</p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <div className="map-container">
          <h4 className="map-container__title">{t("forRent.location")}</h4>
          <p className="map-container__address">{bookingDetails.ad.address}</p>
          <MapView lat={bookingDetails.ad.lat} lng={bookingDetails.ad.lng} />
        </div>

        {/* Add Rate Section */}
        {bookingDetails.rated && bookingDetails.status === "complete" && (
          <div className="add-rate">
            <AddRate booking={bookingDetails} />
          </div>
        )}
      </section>
    </section>
  );
}
