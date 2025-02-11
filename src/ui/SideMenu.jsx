import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function SideMenu({ toggleRef, openMenu, setOpenMenu }) {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const sideMenuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target) &&
      !toggleRef.current.contains(event.target)
    ) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={sideMenuRef}
      className={`side-menu ${lang === "en" ? "en" : ""} ${
        openMenu === true ? "show" : ""
      } `}
    >
      <div className="user">
        <img src={"/images/avatar.png"} />
        <div className="user-info">
          <h1>محمد احمد</h1>
          <Link to="/profile" onClick={() => setOpenMenu(false)}>
            عرض الملف الشخصي
          </Link>
        </div>
      </div>
      <div className="account-setting">
        <ul onClick={() => setOpenMenu(false)}>
          <li>
            <Link>
              <i className="fa-light fa-home"></i>
              <span>{t("header.home")}</span>
            </Link>
          </li>
          <li>
            <Link to="/for-rent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
              >
                <path d="M8.25 19h-3a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 0-1.5 0v7.5a2.25 2.25 0 0 0 2.25 2.25h3a.75.75 0 0 0 0-1.5M1.234 9.823l8.782-7.43a.75.75 0 0 1 .969 0l7.279 6.159a.75.75 0 1 0 .968-1.146l-7.279-6.159a2.25 2.25 0 0 0-2.906 0L.265 8.678a.75.75 0 1 0 .968 1.146zM15.75 2.5h3L18 1.75v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0 0 1.5m6.75 14.25a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0m1.5 0a6.75 6.75 0 1 0-13.5 0 6.75 6.75 0 0 0 13.5 0m-7.5-3v6a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-1.5 0m-2.25 3.75h6a.75.75 0 0 0 0-1.5h-6a.75.75 0 0 0 0 1.5"></path>
              </svg>
              <span>{t("header.dailyRent")}</span>
            </Link>
          </li>
          <li>
            <Link to="/favourites">
              <i className="fa-sharp fa-light fa-heart"></i>
              <span>{t("header.fav")}</span>
            </Link>
          </li>
          <li>
            <Link to="/bookings">
              <i className="fa-light fa-book"></i>
              <span>{t("header.myBookings")}</span>
            </Link>
          </li>
          <li>
            <Link to="/wallet">
              <i className="fa-light fa-wallet"></i>
              <span>{t("header.wallet")}</span>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-light fa-gear"></i>
              <span>{t("header.account")}</span>
            </Link>
          </li>

          <li>
            <Link to="/contact-us">
              <i className="fa-light fa-envelope"></i>
              <span>{t("header.contact")}</span>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-light fa-messages-question"></i>
              <span>{t("header.about")}</span>
            </Link>
          </li>
          <li>
            <Link>
              <i className=" fa-light fa-shield"></i>
              <span>{t("header.privacy")} </span>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-sharp fa-light fa-memo-circle-info"></i>
              <span>{t("header.terms")}</span>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-light fa-envelope"></i>
              <span>{t("header.rateApp")}</span>
            </Link>
          </li>
        </ul>
      </div>
      <button>
        <i className="fa-light fa-power-off"></i>
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}
