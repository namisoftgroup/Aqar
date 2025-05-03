import { useTranslation } from "react-i18next";
import AnimatedButton from "../ui/AnimatedButton";
import InputField from "../ui/form/InputField";
import TextareaField from "../ui/form/TextareaField";

import SectionHeader from "../ui/SectionHeader";
import { useSendContact } from "../hooks/useSendContact";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const { sendContact, isPending } = useSendContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContact(formData, {
      onSuccess: () => {
        toast.success("Contact message sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      },
      onError: (error) => {
        toast.error("Error sending contact message:", error.message);
      },
    });
  };
  return (
    <section>
      <div className="contact">
        <SectionHeader link={t("contact.title")} />

        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 p-2">
                <div className="contact-info-content">
                  <h2>{t("contact.contactInfoTitle")}</h2>
                  <p>{t("contact.contactInfoDescription")}</p>

                  {/*<ul className="contact-items">*/}
                  {/*  <li>*/}
                  {/*    <i className="fa-solid fa-phone"></i>*/}
                  {/*    <p>*/}
                  {/*      <span>{t("contact.phone")} :</span>*/}
                  {/*      <span> +1 123 456 7890</span>*/}
                  {/*    </p>*/}
                  {/*  </li>*/}
                  {/*  <li>*/}
                  {/*    <i className="fa-solid fa-location-dot"></i>*/}
                  {/*    <p>*/}
                  {/*      <span>{t("contact.location")} :</span>*/}
                  {/*      <span>Jeddah, Saudi Arabia 00000, KSA</span>*/}
                  {/*    </p>*/}
                  {/*  </li>*/}
                  {/*  <li>*/}
                  {/*    <i className="fa-solid fa-envelope"></i>*/}
                  {/*    <p>*/}
                  {/*      <span>{t("contact.email")} :</span>*/}
                  {/*      <span>noot@gmail.com</span>*/}
                  {/*    </p>*/}
                  {/*  </li>*/}
                  {/*</ul>*/}
                </div>
              </div>
              <div className="col-lg-6 p-2">
                <div className="contact-content">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <InputField
                          label={t("contact.email")}
                          placeholder={t("contact.emailPlaceholder")}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-6">
                        <InputField
                          label={t("contact.name")}
                          name="name"
                          placeholder={t("contact.namePlaceholder")}
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <InputField
                          label={t("contact.phone")}
                          type="number"
                          name="phone"
                          placeholder={t("contact.phonePlaceholder")}
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <TextareaField
                          label={t("contact.message")}
                          name="message"
                          placeholder={t("contact.messagePlaceholder")}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <AnimatedButton
                          loading={isPending}
                          text={t("contact.submit")}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
