import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { PER_AR, PER_EN } from "../../utils/constants";
import { formateDateDetails } from "../../utils/helper";

export default function PropertyInfo({ adDetails, nights }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [total, seTotal] = useState();

  useMemo(() => {
    seTotal(
      (nights === 0 ? 1 : nights) * adDetails.price + adDetails.clean_price
    );
  }, [nights, adDetails.price, adDetails.clean_price]);

  return (
    <section className="prop-data">
      <div className="prop-data-header">
        <div className="prop-data-header-info">
          <h3>{adDetails.title}</h3>
          <p>
            {adDetails.price} {t("sar")} /{" "}
            {lang === "ar" ? PER_AR[adDetails.per] : PER_EN[adDetails.per]}
          </p>
          <p> {adDetails.address} </p>
        </div>
        <div className="d-flex gap-2">
          <p className="d-flex gap-2 align-items-center">
            <i className="fa-thin fa-eye"></i>
            <span>{adDetails.views_count}</span>
          </p>
          <p className="d-flex gap-2 align-items-center">
            <i className="fa-thin fa-calendar"></i>
            <span>
              {formateDateDetails(
                adDetails.created_at,
                lang === "ar" ? "ar-EG" : "en-US"
              )}
            </span>
          </p>
        </div>
      </div>

      {adDetails.payments && adDetails.payments.length > 0 && (
        <div className="rent-payment">
          <h3>{t("forRent.rentPayments")}</h3>
          <div>
            {adDetails.payments.map((payment) => (
              <p key={payment.id}>
                <span>{payment.price}</span> {t("sar")} {payment.description}
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
            {adDetails.price} {t("sar")} /{" "}
            {lang === "ar" ? PER_AR[adDetails.per] : PER_EN[adDetails.per]}
          </p>
        </div>
        <div>
          <p>{t("forRent.cleanPrice")} </p>
          <p>
            {adDetails.clean_price} {t("sar")}
          </p>
        </div>
        <div>
          <p>{t("forRent.totalPrice")}</p>
          <p>{total}</p>
        </div>
      </div>
      <Link to={`/booking/${adDetails.id}`}>
        <i className="fa-solid fa-calendar"></i> {t("forRent.book")}
      </Link>
    </section>
  );
}
