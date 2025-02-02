import i18next from "i18next";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/languageSlice";

export default function LanguageDropDown() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLanguageChange = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    localStorage.setItem("lang", selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", selectedLanguage === "en");
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded-btn">
        <i className="fa-sharp fa-regular fa-globe"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange("en")}>
          {t("header.english")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange("ar")}>
          {t("header.arabic")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
