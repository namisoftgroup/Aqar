import { useTranslation } from "react-i18next";

export default function PropertyInfo() {
  const { t } = useTranslation();
  return (
    <section className="prop-data">
      <div className="prop-data-header">
        <div className="prop-data-header-info">
          <h3>فيلا للايجار</h3>
          <p> 250,000 ريال / سنوي</p>
          <p>شارع الحمسه،حي الرياض، فيلا ١٨</p>
        </div>
        <div className="d-flex gap-2">
          <p className="d-flex gap-2 align-items-center">
            <i className="fa-thin fa-eye"></i>
            <span>1k</span>
          </p>
          <p className="d-flex gap-2 align-items-center">
            <i className="fa-thin fa-calendar"></i>
            <span>5 يناير 2025</span>
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
      <button>
        <i className="fa-solid fa-calendar"></i> {t("forRent.book")}
      </button>
    </section>
  );
}
