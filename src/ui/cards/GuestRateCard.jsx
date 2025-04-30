import { useSelector } from "react-redux";
import { formateDateDetails } from "../../utils/helper";
import StarsRate from "../StarsRate";

export default function GuestRateCard({ rate }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <section className="guest-rates-card">
      <div className="guest-info">
        <div className="d-flex justify-content-between">
          {" "}
          <p className="rate">
            {formateDateDetails(
              rate.created_at,
              lang === "ar" ? "ar-EG" : "en-US"
            )}
          </p>
          <StarsRate rate={rate.rate} />
        </div>
        <p className="comment">{rate.comment}</p>
        <div className="guest-data">
          <div className="image-wrapper">
            <img src="/images/avatar.png" alt="User" />
          </div>
          <div className="text">
            <h4> {rate.user.name} </h4>
          </div>
        </div>
      </div>
      <p> </p>
    </section>
  );
}
