import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className=" d-none d-md-flex">
      <ul className="nav-links">
        <li className="nav-link">
          <NavLink to="/">{t("header.home")}</NavLink>
        </li>
        <li>
          <NavLink to="/for-rent">{t("header.dailyRent")}</NavLink>
        </li>
        <li>
          <NavLink to="/about-us">{t("header.about")}</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">{t("header.contact")}</NavLink>
        </li>
      </ul>
    </nav>
  );
}
