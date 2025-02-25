import Aos from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function DownloadApp() {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <section className="download-app">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6 d-flex align-items-center">
            <div className="download-app-content">
              <div className="section-title">
                <h1>{t("mobileApp.title")}</h1>
                <p>{t("mobileApp.subtitle")}</p>
                <p>{t("mobileApp.description")}</p>
              </div>
              <h6>{t("mobileApp.tagline")}</h6>
              <div className="apps-items">
                <Link>
                  <img src="/images/apple-store.png" />
                </Link>
                <Link>
                  <img src="/images/play-store.jpg" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex d-none">
            <div className="app-images" data-aos="fade-right">
              <img src="/images/mobile-app.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
