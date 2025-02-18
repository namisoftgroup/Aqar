import { useSelector } from "react-redux";
import { formateDateDetails } from "../../utils/helper";
import StarsRate from "../StarsRate";

export default function GuestRateCard({ rate }) {
  const lang = useSelector((state) => state.language.lang);

  return (
    <section className="guest-rates-card">
      <div className="guest-info">
        <div className="image-wrapper">
          <img src="/images/avatar.png" alt="User" />
        </div>
        <div className="guest-data">
          <h4> {rate.user.name} </h4>
          <p className="rate">
            {formateDateDetails(
              rate.created_at,
              lang === "ar" ? "ar-EG" : "en-US"
            )}
          </p>
          <StarsRate rate={rate.rate} />
        </div>
      </div>
      <p> </p>
    </section>
  );
}
