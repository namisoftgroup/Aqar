import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/helper";
import { useNavigate, useParams } from "react-router";
import { useBookingAd } from "../hooks/bookings/useBookingAd";
import useGetAdDetails from "../hooks/ads/useGetAdDetails";
import ChooseHowToPay from "../ui/book/ChooseHowToPay";
import DetailsCard from "../ui/book/DetailsCard";
import DataLoader from "../ui/DataLoader";
import DateModal from "../ui/modals/DateModal";
import GuestNumberModal from "../ui/modals/GuestNumberModal";

export default function BookingRequest() {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = useSelector((state) => state.language.lang);
  const [selected, setSelected] = useState("wallet");
  const { adDetails, isLoading } = useGetAdDetails();
  const booking = useSelector((state) => state.booking);
  console.log(formatDate(booking.from));

  const [bookingData, setBookingData] = useState({
    adults: 0,
    children: 0,
    baby: 0,
    with_pits: 0,
  });

  const data = {
    ad_id: id,
    from: formatDate(booking.from) || null,
    to: formatDate(booking.to) || null,
    adults: 0,
    children: 0,
    baby: 0,
    with_pits: 0,
    payment_method: selected,
  };
  const totalNumber =
    bookingData.adults + bookingData.children + bookingData.baby;
  const { bookingAd, isLoading: isBookingLoading } = useBookingAd();

  function handelBooking() {
    bookingAd(data);
  }

  if (isLoading) return <DataLoader />;
  return (
    <>
      <section className="book-page">
        <div className="container">
          <div className="row">
            <div className="col-12 p-2">
              <div className="book-header">
                <button onClick={() => navigate(-1)}>
                  {lang === "ar" ? (
                    <i className="fas fa-chevron-right"></i>
                  ) : (
                    <i className="fas fa-chevron-left"></i>
                  )}
                </button>
                <h2>{t("book.confirm")}</h2>
              </div>
            </div>
            <div className="col-lg-5 col-12 p-2">
              <DetailsCard selected={selected} adDetails={adDetails} />
            </div>

            <div className="col-lg-7 col-12 p-2">
              <div className="your-trip mt-3 mt-lg-0">
                <h4>{t("book.yourTrip")}</h4>
                <ul>
                  <li>
                    <div className="trip-data">
                      <span>{t("dates")}</span>
                      {booking.from && booking.to && (
                        <span>
                          {formatDate(booking.from)} - {formatDate(booking.to)}
                        </span>
                      )}
                    </div>
                    <button onClick={() => setShowDateModal(true)}>
                      {t("book.edit")}
                    </button>
                  </li>
                  <li>
                    <div className="trip-data">
                      <span>{t("guests")}</span>
                      {totalNumber > 0 && <span>{totalNumber} ضيوف </span>}
                    </div>
                    <button onClick={() => setShowGuestModal(true)}>
                      {t("book.edit")}
                    </button>
                  </li>
                </ul>
              </div>
              <ChooseHowToPay
                selected={selected}
                setSelected={setSelected}
                adDetails={adDetails}
              />
              <button className="book-btn" onClick={handelBooking}>
                {isBookingLoading && (
                  <i className="fa-duotone fa-regular fa-circle-notch fa-spin"></i>
                )}
                {t("forRent.book")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <DateModal
        showModal={showDateModal}
        setShowModal={setShowDateModal}
        bookingData={bookingData}
        setBookingData={setBookingData}
      />

      <GuestNumberModal
        showModal={showGuestModal}
        setShowModal={setShowGuestModal}
        adDetails={adDetails}
        setBookingData={setBookingData}
      />
    </>
  );
}
