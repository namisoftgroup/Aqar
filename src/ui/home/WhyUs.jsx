import { useTranslation } from "react-i18next";
import { Link } from "react-router";
const features = [
  {
    icon: "/images/saftey.svg",
    title: "home.instantBooking",
    description: "home.instantBookingDesc",
  },
  {
    icon: "/images/payment.svg",
    title: "home.securePayment",
    description: "home.securePaymentDesc",
  },
  {
    icon: "/images/support.svg",
    title: "home.customerService",
    description: "home.customerServiceDesc",
  },
  {
    icon: "/images/reviews.svg",
    title: "home.trustedReviews",
    description: "home.trustedReviewsDesc",
  },
  {
    icon: "/images/smartSearch.svg",
    title: "home.smartSearch",
    description: "home.smartSearchDesc",
  },
  {
    icon: "/images/session360.svg",
    title: "home.photosVideos",
    description: "home.photosVideosDesc",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="why-us-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-12 p-2">
            <div className="why-us-intro">
              <h2 className="why-us-title">{t("home.findDreamplace")}</h2>
              <p className="why-us-description">{t("home.newWayHome")}</p>
              <Link to="/why-us" className="why-us-link">
                {t("home.browseProperties")}
              </Link>
            </div>
          </div>

          <div className="col-lg-7 col-12 p-2">
            <div className="why-us-features">
              <div className="row g-3 feature-grid">
                {features.map((feature, index) => (
                  <div className="col-sm-6 m-0 p-2" key={index}>
                    <div className="feature-content">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="feature-icon"
                      />
                      <div>
                        <h3 className="feature-title">{t(feature.title)}</h3>
                        <p className="feature-description">
                          {t(feature.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
