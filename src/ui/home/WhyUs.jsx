import { useTranslation } from "react-i18next";
import { Link } from "react-router";
const features = [
  {
    icon: "/icons/saftey.svg",
    title: "home.instantBooking",
    description: "home.instantBookingDesc",
  },
  {
    icon: "/icons/payment.svg",
    title: "home.securePayment",
    description: "home.securePaymentDesc",
  },
  {
    icon: "/icons/support.svg",
    title: "home.customerService",
    description: "home.customerServiceDesc",
  },
  {
    icon: "/icons/reviews.svg",
    title: "home.trustedReviews",
    description: "home.trustedReviewsDesc",
  },
  {
    icon: "/icons/smartSearch.svg",
    title: "home.smartSearch",
    description: "home.smartSearchDesc",
  },
  {
    icon: "/icons/session360.svg",
    title: "home.photosVideos",
    description: "home.photosVideosDesc",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid">
      <section className="row g-4 why-us-section">
        <section className="col-lg-5 why-us-intro">
          <h2 className="why-us-title">{t("home.findDreamplace")}</h2>
          <p className="why-us-description">{t("home.newWayHome")}</p>
          <Link to="/why-us" className="why-us-link">
            {t("home.browseProperties")}
          </Link>
        </section>
        <section className="col-lg-7 why-us-features">
          <div className="row g-3 feature-grid">
            {features.map((feature, index) => (
              <div className="col-6 feature-item" key={index}>
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
        </section>
      </section>
    </div>
  );
}
