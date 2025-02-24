import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";

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

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="about">
      <SectionHeader link={t("about.aboutNoot")} />
      <div className="container">
        <div className="why-us">
          <div className="row">
            <div className="why-title">
              <h1>why choose us?</h1>

              <p>
                <span>Our Promise: Quality, Convenience & Secure Rentals</span>
                <span>
                  Find your perfect home with confidence through our trusted
                  network of verified listings, seamless booking, and dedicated
                  support.
                </span>
              </p>
            </div>
            <div className="col-6">
              <div className="why-list">
                <div className="row">
                  {features.map((feature) => (
                    <div className="col-sm-6 m-0 p-2" key={feature.id}>
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
            <div className="col-6">
              <div className="image-wrapper bounce">
                <img src="/images/about1.jpg" alt="about page image" />
              </div>
            </div>
          </div>
          <div className="about2-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="about-image">
                  <img src="/images/about2.png" />
                  <div className="circle-image bounce">
                    <img src="/images/circle-shape.png" />
                  </div>
                  <div className="counter-box bounce">
                    <div className="content">
                      <h2>
                        <span>345</span> +{" "}
                      </h2>
                      <p>LOCATIONS WORLD WIDE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about2-title">
                  <h1> About Noot Agency</h1>
                  <h2>Our Journey Memorable Adventures Worldwide</h2>
                  <p>
                    Our attraction pass save you more than buying individual
                    tickets for your tour package system.
                  </p>
                </div>
                <div className="about-area">
                  <div className="icon">
                    <img src="/icons/support.svg" />
                  </div>
                  <div className="content">
                    <h4>24/7 Support for Hassle-Free Trips</h4>
                    <p>
                      Our attraction pass save you more than buying individual
                      tickets for your tour package system.
                    </p>
                  </div>
                </div>
                <div className="about-area">
                  <div className="icon">
                    <img src="/icons/support.svg" />
                  </div>
                  <div className="content">
                    <h4>Exclusive Deals on Top Destinations</h4>
                    <p>
                      Our attraction pass save you more than buying individual
                      tickets for your tour package system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
