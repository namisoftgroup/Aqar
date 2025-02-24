import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputField from "../ui/form/InputField";
import TextareaField from "../ui/form/TextareaField";

export default function Contact() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <section>
      <div className="contact">
        <div className={`  ${lang === "ar" ? "ar" : " "} page_header`}>
          <div className="container z-1">
            <div className="contat-title">
              <Breadcrumb>
                <Breadcrumb.Item href="/">{t("contact.home")}</Breadcrumb.Item>
                <Breadcrumb.Item
                  className={`${lang === "ar" ? "ar" : " "}`}
                  active
                >
                  {t("contact.title")}
                </Breadcrumb.Item>
              </Breadcrumb>
              <h2>{t("contact.title")}</h2>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 p-2">
                <div className="contact-info-content">
                  <h2>{t("contact.contactInfoTitle")}</h2>
                  <p>{t("contact.contactInfoDescription")}</p>
                  <ul className="contact-items">
                    <li>
                      <i className="fa-solid fa-phone"></i>
                      <p>
                        <span>{t("contact.phone")} :</span>
                        <span> +1 123 456 7890</span>
                      </p>
                    </li>
                    <li>
                      <i className="fa-solid fa-location-dot"></i>
                      <p>
                        <span>{t("contact.location")} :</span>
                        <span>Jeddah, Saudi Arabia 00000, KSA</span>
                      </p>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>
                      <p>
                        <span>{t("contact.email")} :</span>
                        <span>noot@gmail.com</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 p-2">
                <div className="contact-content">
                  <form className="contact-form">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <InputField
                          label={t("contact.email")}
                          placeholder={t("contact.emailPlaceholder")}
                        />
                      </div>
                      <div className="col-lg-6">
                        <InputField
                          label={t("contact.name")}
                          placeholder={t("contact.namePlaceholder")}
                        />
                      </div>
                      <div className="col-12">
                        <InputField
                          label={t("contact.phone")}
                          type="number"
                          placeholder={t("contact.phonePlaceholder")}
                        />
                      </div>
                      <div className="col-12">
                        <TextareaField
                          label={t("contact.message")}
                          placeholder={t("contact.messagePlaceholder")}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          className={`contact-btn ${
                            lang === "ar" ? "ar" : " "
                          }`}
                        >
                          <span>{t("contact.submit")}</span>
                          <i
                            className={`fa-solid  ${
                              lang === "ar"
                                ? "fa-arrow-left-long"
                                : "fa-arrow-right-long"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "-12px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13735.308237673138!2d30.976159350000003!3d30.61064085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1740395176854!5m2!1sen!2seg"
            width="100%"
            height="400"
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
