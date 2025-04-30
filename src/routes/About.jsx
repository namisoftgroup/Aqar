import { useTranslation } from "react-i18next";

import AboutSectionHeader from "../ui/about/AboutSectionHeader";
import SectionHeader from "../ui/SectionHeader";

const features = [
  {
    id: 1,
    icon: "/icons/saftey.svg",
    title: "home.instantBooking",
    description: "home.instantBookingDesc",
  },
  {
    id: 2,
    icon: "/icons/payment.svg",
    title: "home.securePayment",
    description: "home.securePaymentDesc",
  },
  {
    id: 3,
    icon: "/icons/support.svg",
    title: "home.customerService",
    description: "home.customerServiceDesc",
  },
  {
    id: 4,
    icon: "/icons/reviews.svg",
    title: "home.trustedReviews",
    description: "home.trustedReviewsDesc",
  },
  {
    id: 5,
    icon: "/icons/smartSearch.svg",
    title: "home.smartSearch",
    description: "home.smartSearchDesc",
  },
  {
    id: 6,
    icon: "/icons/session360.svg",
    title: "home.photosVideos",
    description: "home.photosVideosDesc",
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about">
      <SectionHeader link={t("about.aboutNoot")} />
      <div className="why-us">
        <div className="container">
          <div className="row">
            <AboutSectionHeader
              title={t("about.whyChooseUs")}
              subTitle={t("about.ourPromise")}
              description={t("about.findPerfectHome")}
            />

            <div className="col-lg-6">
              <div className="why-list">
                <div className="row">
                  {features.map((feature) => (
                    <div className="col-sm-6 m-0 p-2" key={feature.id}>
                      <div className="feature-content">
                        <img
                          src={feature.icon}
                          alt={t(feature.title)}
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
            <div className="col-lg-6">
              <div className="image-wrapper bounce">
                <img src="/images/about1.jpg" alt={t("about.aboutImageAlt")} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about2-wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="about-image">
                <img src="/images/about2.png" alt={t("about.secondImageAlt")} />
                <div className="circle-image bounce">
                  <img
                    src="/images/circle-shape.png"
                    alt={t("about.circleShapeAlt")}
                  />
                </div>
                <div className="counter-box bounce">
                  <div className="content">
                    <h2>
                      <span>345</span> +
                    </h2>
                    <p>{t("about.locationsWorldwide")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about2-title">
                <h1>{t("about.agencyTitle")}</h1>
                <h2>{t("about.journeyTitle")}</h2>
                <p>{t("about.savingsDescription")}</p>
              </div>
              <div className="about-area">
                <div className="icon">
                  <img
                    src="/icons/support.svg"
                    alt={t("about.supportIconAlt")}
                  />
                </div>
                <div className="content">
                  <h4>{t("about.supportTitle")}</h4>
                  <p>{t("about.supportDescription")}</p>
                </div>
              </div>
              <div className="about-area">
                <div className="icon">
                  <img
                    src="/icons/offer-icon.svg"
                    alt={t("about.dealsIconAlt")}
                  />
                </div>
                <div className="content">
                  <h4>{t("about.dealsTitle")}</h4>
                  <p>{t("about.dealsDescription")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <OurParteners /> */}
      {/* <BlogsSection /> */}
    </section>
  );
}
