import { useSelector } from "react-redux";
import PropertyCard from "../cards/PropertyCard";
import { useTranslation } from "react-i18next";
import { PER_AR, PER_EN } from "../../utils/constants";
import { useMemo, useState } from "react";

export default function DetailsCard({ adDetails }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const nights = useSelector((state) => state.booking.nights);
  const [total, seTotal] = useState();

  useMemo(() => {
    seTotal(
      (nights === 0 ? 1 : nights) * adDetails.price + adDetails.clean_price
    );
  }, [nights, adDetails.price, adDetails.clean_price]);
  return (
    <div className="details-card">
      <PropertyCard ad={adDetails} />
      <div className="price-details">
        <h4>{t("book.priceDetails")}</h4>
        <ul>
          <li>
            <span>
              {adDetails.price} ريال /{" "}
              {lang === "ar" ? PER_AR[adDetails.per] : PER_EN[adDetails.per]}{" "}
              {nights > 0 && (
                <>
                  {" "}
                  &#10005; {nights} {t("forRent.nights")}{" "}
                </>
              )}
            </span>
            <span>
              {nights > 0 ? nights * adDetails.price : adDetails.price} ريال
            </span>
          </li>
          <li>
            <span>{t("forRent.cleanPrice")} </span>
            <span>{adDetails.clean_price} ريال</span>
          </li>
        </ul>
      </div>

      <div className="total">
        <h4>{t("book.totalPrice")}</h4>
        <span>{total} ريال</span>
      </div>
    </div>
  );
}
