import { useTranslation } from "react-i18next";

export default function AboutSectionHeader({ title, subTitle, description }) {
  const { t } = useTranslation();
  return (
    <div className="about-subtitle">
      <h1>{title}</h1>
      <p>
        <span>{subTitle}</span>
        <span>{description}</span>
      </p>
    </div>
  );
}
