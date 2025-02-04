import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();
  return (
    <div className="prop-features">
      <h5>{t("forRent.features")}</h5>
      <ul className="features-list">
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
        <li>
          <img src="/icons/check.png" /> دفعتين
        </li>
      </ul>
    </div>
  );
}
