import { Link } from "react-router";
import Logo from "./Header/Logo";
import { useTranslation } from "react-i18next";
import { useGetSettings } from "../hooks/settings/useGetSettings";

export default function Footer() {
  const { t } = useTranslation();
  const { settings, isLoading } = useGetSettings();
  return (
    <footer className="main-footer">
      <div className="container gap-3">
        <div className="row g-3 py-5">
          <div className="col-12 col-md-6 col-lg-3 footer-links">
            <h5>{t("footer.support")}</h5>
            <ul>
              <li>
                <Link to={"/contact-us"}>{t("footer.contactUs")}</Link>
              </li>
              <li>
                <Link>{t("footer.help")}</Link>
              </li>
              <li>
                <Link>{t("footer.cancelOrder")}</Link>
              </li>
              <li>
                <Link>{t("footer.faqs")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 footer-links">
            <h5>{t("footer.mainSections")}</h5>
            <ul>
              <li>
                <Link>{t("footer.contactUs")}</Link>
              </li>
              <li>
                <Link>{t("footer.help")}</Link>
              </li>
              <li>
                <Link>{t("footer.cancelOrder")}</Link>
              </li>
              <li>
                <Link>{t("footer.faqs")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 footer-links">
            <h5>{t("footer.quickLinks")}</h5>
            <ul>
              <li>
                <Link to={"home"}>{t("footer.home")}</Link>
              </li>
              <li>
                <Link to={settings?.about_link}>{t("footer.about")}</Link>
              </li>
              <li>
                <Link to={"/for-rent"}>{t("footer.listing")}</Link>
              </li>
            </ul>
          </div>
          <div className="news-letter col-12 col-md-6 col-lg-3">
            <h5>{t("footer.subscripe")}</h5>
            <form className="newsletter-form">
              <input type="email" placeholder={t("form.emailPlaceholder")} />
              <button type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
            <p>{t("footer.newsletterDesc")}</p>
          </div>
        </div>
        <div className="row g-3 border-top">
          <div className="col-12 col-md-6 col-lg-4 ">
            <Logo />
            <p className="copy-right">
              © {new Date().getFullYear()} {t("footer.aqar")}{" "}
              {t("footer.copyright")}
            </p>
          </div>
          <div className="links col-12 col-md-6 col-lg-4 ">
            {!isLoading && (
              <>
                <Link to={settings?.terms_link} target="_blank">
                  {t("footer.terms")}
                </Link>
                <Link to={settings?.privacy_link} target="_blank">
                  {t("footer.privacy")}
                </Link>{" "}
              </>
            )}
          </div>
          <div className="social-links col-12 col-md-6 col-lg-4">
            <Link to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
