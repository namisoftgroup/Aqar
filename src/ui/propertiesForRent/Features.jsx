import { useTranslation } from "react-i18next";

export default function Features({ features }) {
  const { t } = useTranslation();
  return (
    <div className="prop-features">
      <h4>{t("forRent.features")}</h4>
      <ul className="features-list">
        {features.map((feature) => (
          <li key={feature.id}>
            <img src="/icons/check.png" /> <span>{feature.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
