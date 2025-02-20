import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useGetSettings } from "../../hooks/settings/useGetSettings";

export default function Navbar() {
  const { t } = useTranslation();
  const { settings, isLoading } = useGetSettings();
  if (isLoading) return <></>;
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
          <NavLink to={settings?.about_link} target="_blank">
            {t("header.about")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">{t("header.contact")}</NavLink>
        </li>
      </ul>
    </nav>
  );
}
