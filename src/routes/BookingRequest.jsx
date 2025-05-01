import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import useGetAdDetails from "../hooks/ads/useGetAdDetails";
import { useBookingAd } from "../hooks/bookings/useBookingAd";
import BookingHeader from "../ui/book/BookingHeader";
import BookingSummary from "../ui/book/BookingSummary";
import ChooseHowToPay from "../ui/book/ChooseHowToPay";
import DetailsCard from "../ui/book/DetailsCard";
import DataLoader from "../ui/DataLoader";
import DateModal from "../ui/modals/DateModal";
import GuestNumberModal from "../ui/modals/GuestNumberModal";
import { formatDate } from "../utils/helper";

export default function BookingRequest() {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [duration, setDuration] = useState(1);
  const [priceReq, setPriceReq] = useState();
  const nights = useSelector((state) => state.booking.nights);
  const { t } = useTranslation();
  const { id } = useParams();

  const [selected, setSelected] = useState("wallet");
  const { adDetails, isLoading } = useGetAdDetails();
  const booking = useSelector((state) => state.booking);
  console.log(adDetails);
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  useMemo(() => {
    if (adDetails?.per === "day") {
      setPriceReq((nights === 0 ? 1 : nights) * adDetails?.price);
    } else {
      setPriceReq(duration * adDetails?.price);
    }
  }, [duration, nights, adDetails?.price, adDetails?.per]);
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
    adults: bookingData.adults || 0,
    children: bookingData.children || 0,
    baby: bookingData.baby || 0,
    with_pits: bookingData.with_pits || 0,
    payment_method: selected,
    price: priceReq,
  };

  const { bookingAd, isPending: isBookingLoading } = useBookingAd();

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
              <BookingHeader />
            </div>
            <div className="col-lg-5 col-12 p-2">
              <DetailsCard
                selected={selected}
                adDetails={adDetails}
                duration={duration}
              />
            </div>
            <div className="col-lg-7 col-12 p-2">
              <BookingSummary
                bookingData={bookingData}
                adDetails={adDetails}
                setShowDateModal={setShowDateModal}
                setShowGuestModal={setShowGuestModal}
                duration={duration}
                setDuration={setDuration}
              />
              <ChooseHowToPay
                selected={selected}
                setSelected={setSelected}
                adDetails={adDetails}
              />
              {booking.to || booking.from || booking.date ? (
                selected === "online" ? (
                  <Link
                    className="book-btn d-block text-center"
                    to={
                      priceReq === 0 || priceReq === ""
                        ? ""
                        : `https://api.noot.com.sa/payment/${priceReq}?Authorization=${token}&Redirect_url=${window.location.href}`
                    }
                  >
                    {" "}
                    {t("forRent.book")}
                  </Link>
                ) : (
                  <button className="book-btn" onClick={handelBooking}>
                    {isBookingLoading && (
                      <i className="fa-duotone fa-regular fa-circle-notch fa-spin"></i>
                    )}
                    {t("forRent.book")}
                  </button>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>

      <DateModal
        showModal={showDateModal}
        setShowModal={setShowDateModal}
        bookingData={bookingData}
        setBookingData={setBookingData}
        per={adDetails.per}
      />

      <GuestNumberModal
        showModal={showGuestModal}
        setShowModal={setShowGuestModal}
        adDetails={adDetails}
        setBookingData={setBookingData}
        bookingData={bookingData}
      />
    </>
  );
}
