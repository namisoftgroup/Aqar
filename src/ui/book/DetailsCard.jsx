import PropertyCard from "../cards/PropertyCard";
import { useTranslation } from "react-i18next";

export default function DetailsCard({ selected }) {
  const { t } = useTranslation();
  return (
    <div className="details-card">
      <PropertyCard />
      <div className="price-details">
        <h4>{t("book.priceDetails")}</h4>
        <ul>
          <li>
            <span>20 ريال x 5 ليالي</span>
            <span>200 ريال</span>
          </li>
          <li>
            <span>رسوم تنظيف</span>
            <span>15 ريال</span>
          </li>
          <li>
            <span>رسوم التطبيق</span>
            <span>30 ريال</span>
          </li>
          {selected === "all" ? (
            ""
          ) : (
            <li>
              <span>{t("book.totalPrice")}</span>
              <span>245 ريال</span>
            </li>
          )}
        </ul>
      </div>
      {selected === "all" ? (
        <div className="total">
          <h4>{t("book.totalPrice")}</h4>
          <span>245 ريال</span>
        </div>
      ) : (
        <div className="py-3">
          <div className="part">
            <h5>{t("book.now")}</h5>
            <span>150 ريال</span>
          </div>
          <div className="part">
            <h5>on Apr 25</h5>
            <span>105 ريال</span>
          </div>
        </div>
      )}
    </div>
  );
}
