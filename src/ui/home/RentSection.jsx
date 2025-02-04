import { Link } from "react-router";
import PropertyCard from "../cards/PropertyCard";
import { useTranslation } from "react-i18next";

export default function RentSection() {
  const { t } = useTranslation();
  return (
    <section className="rent-section">
      <section className="section-header ">
        <div className="">
          <h2>{t("home.forRentUnits")}</h2>
          <p>{t("home.forRentUnitsdes")}</p>
        </div>
        <Link to={"for-rent"} className="">
          {t("home.viewAll")}{" "}
        </Link>
      </section>
      <section className="row">
        {Array(8)
          .fill()
          .map((_, i) => (
            <div key={i} className="col-xxl-3 col-lg-4 col-md-6 col-12 p-2">
              <PropertyCard />
            </div>
          ))}
      </section>
    </section>
  );
}
