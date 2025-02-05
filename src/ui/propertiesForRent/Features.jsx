import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();
  return (
    <div className="prop-features">
      <h4>{t("forRent.features")}</h4>
      <ul className="features-list">
        <li>
          <img src="/icons/check.png" /> <span>دفعتين</span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>مطبخ</span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>مدخل سيارة</span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>مكيفات</span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>توفر مياه </span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>توفر كهرباء </span>
        </li>
        <li>
          <img src="/icons/check.png" /> <span>توفر صرف صحي</span>
        </li>
      </ul>
    </div>
  );
}
