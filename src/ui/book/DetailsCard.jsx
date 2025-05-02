import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PER_AR, PER_EN } from "../../utils/constants";
import PropertyCard from "../cards/PropertyCard";

export default function DetailsCard({ adDetails, duration, total, seTotal }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const nights = useSelector((state) => state.booking.nights);
 
  useMemo(() => {
    if (adDetails?.per === "day") {
      seTotal(
        (nights === 0 ? 1 : nights) * adDetails?.price + adDetails.clean_price
      );
    } else {
      seTotal(duration * adDetails?.price + adDetails.clean_price);
    }
  }, [
    duration,
    nights,
    adDetails?.price,
    adDetails.clean_price,
    adDetails.per,
  ]);
  return (
    <div className="details-card">
      <PropertyCard ad={adDetails} className="bg_gray" />
      <div className="price-details">
        <h4>{t("book.priceDetails")}</h4>
        <ul>
          <li>
            <span>
              {adDetails.price} {t("sar")} /{" "}
              {lang === "ar" ? PER_AR[adDetails.per] : PER_EN[adDetails.per]}{" "}
              {adDetails?.per === "day" && nights > 0 ? (
                <>
                  &#10005; {nights} {t("forRent.nights")}{" "}
                </>
              ) : (
                <>&#10005; {duration}</>
              )}
            </span>
            <span>
              {adDetails.per === "day" && nights > 0
                ? nights * adDetails.price
                : duration * adDetails.price}
              {t("sar")}
            </span>
          </li>
          {adDetails.clean_price > 0 && (
            <li>
              <span>{t("forRent.cleanPrice")} </span>
              <span>
                {adDetails.clean_price} {t("sar")}
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="total">
        <h4>{t("book.totalPrice")}</h4>
        <span>
          {total} {t("sar")}
        </span>
      </div>
    </div>
  );
}
