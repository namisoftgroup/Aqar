import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetBookingDetails from "../hooks/bookings/useGetBookingDetails";
import AddRate from "../ui/AddRate";
import DataLoader from "../ui/DataLoader";
import ProgressBar from "../ui/ProgressBar";
import Gallary from "../ui/PropertiesForRent/Gallary";
import MapSection from "../ui/PropertiesForRent/MapSection";
import Owner from "../ui/PropertiesForRent/owner";
import {
  BOOKING_STATUS_AR,
  BOOKING_STATUS_EN,
  PER_AR,
  PER_EN,
} from "../utils/constants";
import { calculateNights, formateDateDetails } from "../utils/helper";

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
        <Gallary images={bookingDetails.ad.images} />
        <div className="row g-3">
          <div className="col-md-7">
            <div className="order-prop-details">
              <h3>{bookingDetails.ad.title}</h3>
              <p>
                {bookingDetails.ad.price} ريال /{" "}
                {lang === "ar"
                  ? PER_AR[bookingDetails.ad.per]
                  : PER_EN[bookingDetails.ad.per]}
              </p>
              <p>{bookingDetails.ad.address}</p>
              <ProgressBar status={bookingDetails.status} />
              <div className="order-status">
                <span>{t("book.bookingStatus")} </span>
                <span
                  className={`booking-status-label  ${bookingDetails.status}`}
                >
                  {lang === "ar"
                    ? BOOKING_STATUS_AR[bookingDetails.status]
                    : BOOKING_STATUS_EN[bookingDetails.status]}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <Owner owner={bookingDetails.ad.user} />
          </div>
        </div>

        <section className="prop-data border-0">
          <div className="your-trip">
            <h3>{t("book.yourTrip")}</h3>
            <div className="date">
              <span>{t("book.dates")}</span>
              <span>
                {formateDateDetails(bookingDetails.from, locale)} -
                {formateDateDetails(bookingDetails.to, locale)}
              </span>
            </div>
            <div className="date">
              <span>{t("book.guestsNumber")}</span>
              <span>
                {" "}
                {bookingDetails.adults +
                  bookingDetails.children +
                  bookingDetails.baby}
              </span>
            </div>
          </div>

          {/* <h3>{t("forRent.villaDetails")}</h3>
          <ul>
            <li>
              <span>
                <i className=" fa-solid fa-wifi"></i> التغطيه
              </span>
              <span> 1</span>
            </li>
            <li>
              <span>
                <img src="/icons/fluent_space.png" />
                المساحه
              </span>
              <span>wifi,5G</span>
            </li>
            <li>
              <span>
                <i className="fa-thin fa-fire-extinguisher"></i> سعر المتر
              </span>
              <span>1,000 رال </span>
            </li>
            <li>
              {" "}
              <span>
                <i className="fa-thin fa-bed-front"></i> عدد الصلات
              </span>
              <span>2</span>
            </li>
            <li>
              <span>
                <i className="fa-thin fa-bath"></i>عدد دوره المياة
              </span>
              <span>3</span>
            </li>
            <li>
              {" "}
              <span>
                <i className="fa-thin fa-bed-front"></i>عدد الغرف
              </span>
              <span>5</span>
            </li>
          </ul> */}

          {bookingDetails.ad.payments &&
            bookingDetails.ad.payments.length > 0 && (
              <div className="rent-payment">
                <h3>{t("forRent.rentPayments")}</h3>
                <div>
                  {bookingDetails.ad.payments.map((payment) => (
                    <p key={payment.id}>
                      <span>{payment.price}</span> ريال {payment.description}
                    </p>
                  ))}
                </div>
              </div>
            )}
          <div className="price">
            <h3>{t("forRent.price")}</h3>
            <div>
              {nights > 0 ? (
                <p>
                  {nights} {t("forRent.nights")}{" "}
                </p>
              ) : (
                <p>سعر الليله </p>
              )}

              <p>
                {bookingDetails.ad.price} ريال /{" "}
                {lang === "ar"
                  ? PER_AR[bookingDetails.ad.per]
                  : PER_EN[bookingDetails.ad.per]}
              </p>
            </div>
            <div>
              <p>{t("forRent.cleanPrice")} </p>
              <p>{bookingDetails.ad.clean_price} ريال</p>
            </div>
            <div>
              <p>{t("forRent.totalPrice")}</p>
              <p>{total}</p>
            </div>
          </div>
        </section>

        <div className="map-container">
          <h4>{t("forRent.location")}</h4>
          <p>{bookingDetails.ad.address}</p>
          <MapSection
            properties={[
              {
                position: {
                  lat: bookingDetails.ad.lat,
                  lng: bookingDetails.ad.lang,
                },
                price: bookingDetails.ad.price,
              },
            ]}
          />
        </div>
        {bookingDetails.rated && bookingDetails.status === "complete" && (
          <AddRate booking={bookingDetails} />
        )}
      </section>
    </section>
  );
}
