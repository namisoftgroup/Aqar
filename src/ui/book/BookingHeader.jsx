import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function BookingHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
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
  );
}
