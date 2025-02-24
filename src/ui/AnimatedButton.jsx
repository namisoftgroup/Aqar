import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function AnimatedButton({ loading, text, props }) {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  return (
    <button {...props} className={`animated-btn ${lang === "ar" ? "ar" : " "}`}>
      {loading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <>
          {" "}
          <span>{text}</span>
          <i
            className={`fa-solid  ${
              lang === "ar" ? "fa-arrow-left-long" : "fa-arrow-right-long"
            }`}
          ></i>{" "}
        </>
      )}
    </button>
  );
}
