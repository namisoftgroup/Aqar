import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BOOKING_STATUS_AR, BOOKING_STATUS_EN } from "../../utils/constants";
import ProgressBar from "../ProgressBar";
import { formateDateDetails } from "../../utils/helper";

export default function MyBookingCard({ booking }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  return (
    <div className="card">
      <img src="/images/house-1.jpg" alt="Booking" className="card-img-top" />
      <div className="card-body">
        <h4 className="card-title ">{booking.title}</h4>
        <p className="card-text">{booking.price} ريال / سنوي</p>
        <p className="text-muted">
          {t("book.date")} {formateDateDetails(booking.from, locale)} -
          {formateDateDetails(booking.to, locale)}
        </p>

        <div>
          {booking.adults} {t("filter.adults")} - {booking.children}{" "}
          {t("filter.children")} - {booking.baby} {t("filter.babbies")}
        </div>

        <p className="d-flex align-items-center justify-content-between m-0">
          <span className="">#{booking.id}</span>
        </p>
      </div>
      <ProgressBar status={booking.status} />
      <div className="booding-card-footer">
        <span className={`booking-status-label  ${booking.status}`}>
          {lang === "ar"
            ? BOOKING_STATUS_AR[booking.status]
            : BOOKING_STATUS_EN[booking.status]}
        </span>
        <Link to={`${booking.id}`}>{t("book.more")}</Link>
      </div>
    </div>
  );
}
