import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DetailsCard from "../ui/book/DetailsCard";
import PaymentForm from "../ui/book/PaymentForm";
import ChooseHowToPay from "../ui/book/ChooseHowToPay";
import { useState } from "react";

export default function BookingRequest() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [selected, setSelected] = useState("all");
  return (
    <section className="book-page">
      <div className="container">
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
        <div className="row g-5">
          <div className="col-5">
            <DetailsCard selected={selected} />
          </div>
          <div className="col-7">
            <div className="your-trip">
              <h4>{t("book.yourTrip")}</h4>
              <ul>
                <li>
                  <div className="trip-data">
                    <span>التواريخ</span>
                    <span>30 مارس -4 ابريل</span>
                  </div>
                  <button>{t("book.edit")}</button>
                </li>
                <li>
                  <div className="trip-data">
                    <span>الضيوف</span>
                    <span>2 ضيوف </span>
                  </div>
                  <button>{t("book.edit")}</button>
                </li>
              </ul>
            </div>
            <ChooseHowToPay selected={selected} setSelected={setSelected} />
            <PaymentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
