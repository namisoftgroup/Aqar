import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { formateDateDetails } from "../../utils/helper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function PropertyInfo({ adDetails, nights }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [total, seTotal] = useState();
  useEffect(() => {
    seTotal(nights * adDetails.price);
  }, [nights, adDetails.price]);

  return (
    <section className="prop-data">
      <div className="prop-data-header">
        <div className="prop-data-header-info">
          <h3>{adDetails.title}</h3>
          <p>
            {" "}
            {adDetails.price} ريال / {adDetails.per}
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
                adDetails.updated_at,
                lang === "ar" ? "ar-EG" : "en-US"
              )}
            </span>
          </p>
        </div>
      </div>
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
      </ul>
      <div className="rent-payment">
        <h3>{t("forRent.rentPayments")}</h3>
        <div>
          {adDetails.payments.map((payment) => (
            <p key={payment.id}>
              <span>{payment.price}</span> ريال {payment.description}
            </p>
          ))}
        </div>
      </div>
      <div className="price">
        <h3>{t("forRent.price")}</h3>
        <div>
          <p>
            ريال {adDetails.per} {adDetails.price}
          </p>
          <p>{nights} ليالي</p>
        </div>
        <div>
          <p>الاجمالي</p>
          <p>{total}</p>
        </div>
      </div>
      <Link to={"/booking"}>
        <i className="fa-solid fa-calendar"></i> {t("forRent.book")}
      </Link>
    </section>
  );
}
