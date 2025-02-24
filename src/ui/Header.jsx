import { useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetSettings } from "../hooks/settings/useGetSettings";
import SideMenu from "./SideMenu";
import UserDropDown from "./Header/UserDropDown";
import LanguageDropDown from "./Header/LanguageDropDown";
import useAuth from "../hooks/helper/useAuth";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuToggleButton = useRef(null);
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { settings } = useGetSettings();

  return (
    <header className="header">
      <nav className="container d-flex">
        <div className="header_logo">
          <button onClick={() => setOpenMenu((open) => !open)}>
            <i ref={menuToggleButton} className="fa-regular fa-bars"></i>
          </button>
          <div className={`overlay  ${openMenu ? "show" : ""}`}></div>
          <SideMenu
            toggleRef={menuToggleButton}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
          <Link href="/" className="logo">
            <img src="/images/logo.svg" alt="Aqar's logo" />
          </Link>
        </div>

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

        <section className="header-settings">
          {isAuthed && (
            <Link to="/notifications" className="rounded-btn d-none d-sm-flex">
              <i className="fa-light fa-bell"></i>
            </Link>
          )}
          <LanguageDropDown />
          <UserDropDown />
        </section>
      </nav>
    </header>
  );
}
