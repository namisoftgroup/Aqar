import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BOOKING_STATUS_AR, BOOKING_STATUS_EN } from "../../utils/constants";

export default function MyBookingCard() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className="card">
      <img src="/images/house-1.jpg" alt="Booking" className="card-img-top" />
      <div className="card-body">
        <h4 className="card-title ">فيلا للايجار</h4>
        <p className="card-text">250,000 ريال / سنوي</p>
        <p className="text-muted">تاريخ 15-20 يناير - 2 بالغون</p>
        <p className="d-flex align-items-center justify-content-between m-0">
          <span className="">#435346346</span>
          <span className="text-muted">12-12-2025</span>
        </p>
      </div>
      <div className="status-bar">
        <div
          className="progress "
          style={{
            height: "6px",
            borderRadius: "8px",
          }}
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {" "}
          <div
            className="progress-bar  inReview"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
      <div className="booding-card-footer">
        <span className="inReview">
          {lang === "ar"
            ? BOOKING_STATUS_AR.inReview
            : BOOKING_STATUS_EN.inReview}
        </span>
        <Link to={`2`} className="text-decoration-none ">
          {t("book.more")}
        </Link>
      </div>
    </div>
  );
}
