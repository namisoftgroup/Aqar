import { useTranslation } from "react-i18next";

export default function PropertyInfo() {
  const { t } = useTranslation();
  return (
    <section>
      <div>
        <div>
          <h3>فيلا للايجار</h3>
          <p> 250,000 ريال / سنوي</p>
          <p>شارع الحمسه،حي الرياض، فيلا ١٨</p>
        </div>
        <div>
          <p>
            <i className="fa-thin fa-eye"></i>
            1k
          </p>
          <p>
            <i className="fa-thin fa-calendar"></i>5 يناير 2025
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
      <div>
        <h4>{t("forRent.rentPayments")}</h4>
        <div>
          <p>60,300 ريال علي دفعه واحده</p>
          <p>60,300 ريال علي دفعه دفعتين</p>
        </div>
      </div>
      <div>
        <h4>{t("forRent.price")}</h4>
        <p>20 ريال الليلة</p>
      </div>
      <button>
        <i className="fa-solid fa-calendar"></i> {t("forRent.book")}
      </button>
    </section>
  );
}
