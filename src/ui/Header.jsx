import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/helper/useAuth";
import LanguageDropDown from "./Header/LanguageDropDown";
import UserDropDown from "./Header/UserDropDown";
import SideMenu from "./SideMenu";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuToggleButton = useRef(null);
  const { t } = useTranslation();
  const { isAuthed } = useAuth();

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
