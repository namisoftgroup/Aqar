import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProgressBar from "../ui/ProgressBar";
import Gallary from "../ui/propertiesForRent/Gallary";
import MapSection from "../ui/propertiesForRent/MapSection";
import Owner from "../ui/propertiesForRent/owner";
import { BOOKING_STATUS_AR, BOOKING_STATUS_EN } from "../utils/constants";

export default function BookingsDetails() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <section className="for-rent-details">
      <section className="container">
        <Gallary />
        <div className="row">
          <div className="col-8">
            <div className="order-prop-details">
              <h3>فيلا للايجار</h3>
              <p> 250,000 ريال / سنوي</p>
              <p>شارع الحمسه،حي الرياض، فيلا ١٨</p>
              <ProgressBar status="cancelled" />
              <div className="order-status">
                <span>{t("book.bookingStatus")} </span>
                <span className="booking-status-label cancelled">
                  {lang === "ar"
                    ? BOOKING_STATUS_AR.cancelled
                    : BOOKING_STATUS_EN.cancelled}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <Owner />
          </div>
        </div>

        <section className="prop-data border-0">
          <div className="your-trip">
            <h3>{t("book.yourTrip")}</h3>
            <div className="date">
              <span>{t("book.dates")}</span>
              <span>30 مارس - 4 ابريل</span>
            </div>
            <div className="date">
              <span>{t("book.guestsNumber")}</span>
              <span>2 ضيوف</span>
            </div>
          </div>

          <h3>{t("forRent.villaDetails")}</h3>
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
              <p>
                <span>60,300</span> ريال علي دفعه واحده
              </p>
              <p>
                <span>60,300</span> ريال علي دفعه دفعتين
              </p>
            </div>
          </div>
          <div className="price">
            <h3>{t("forRent.price")}</h3>
            <div>
              <p>20 ريال الليلة</p>
              <p>6 ليالي</p>
            </div>
            <div>
              <p>الاجمالي</p>
              <p>120</p>
            </div>
          </div>
        </section>

        <div className="map-container">
          <h4>{t("forRent.location")}</h4>
          <p>شارع الحمسه،حي الرياض،</p>
          <MapSection />
        </div>
      </section>
    </section>
  );
}
