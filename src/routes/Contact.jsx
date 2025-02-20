// import { Link } from "react-router";
// import InputField from "../ui/form/InputField";
// import SubmitButton from "../ui/form/SubmitButton";
// import TextareaField from "../ui/form/TextareaField";
// import { useTranslation } from "react-i18next";

// export default function Contact() {
//   const { t } = useTranslation();
//   return (
//     <section className="container">
//       <div className="contact">
//         <div className="contact-header">
//           <h2>Contact Us</h2>
//           <p>Feel free to reach out for any inquiries or questions.</p>
//         </div>
//         <div className="contact-wrapper">
//           <div className="row">
//             {" "}
//             <div className="col-lg-6">
//               <div className="contact-info-wrapper">
//                 <div>
//                   <h3>Contact Information</h3>
//                   <p>Say something to start a live chat!</p>
//                 </div>
//                 <div className="contact-info">
//                   <p>
//                     <i className="fa-solid fa-phone"></i>
//                     <span> +1 123 456 7890</span>
//                   </p>
//                   <p>
//                     <i className="fa-solid fa-envelope"></i>
//                     <span> exapmle@gmail.com</span>
//                   </p>
//                   <p>
//                     <i className="fa-solid fa-location-dot"></i>
//                     <span> +1 123 456 7890</span>
//                   </p>
//                 </div>
//                 <div className="social-media-links">
//                   <Link>
//                     <i className="fa-brands fa-facebook"></i>
//                   </Link>
//                   <Link>
//                     <i className="fa-brands fa-twitter"></i>
//                   </Link>
//                   <Link>
//                     <i className="fa-brands fa-instagram"></i>
//                   </Link>
//                   <Link>
//                     <i className="fa-brands fa-linkedin"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 ">
//               <form className="contact-form">
//                 <InputField
//                   label={"Name"}
//                   type="text"
//                   placeholder="Enter Your Name"
//                 />
//                 <InputField
//                   label={"Email"}
//                   type="email"
//                   placeholder="Enter Your Email"
//                 />
//                 <InputField
//                   label={"Subject"}
//                   type="text"
//                   placeholder="Subject Title"
//                 />
//                 <TextareaField
//                   label={"Message"}
//                   placeholder="Your Message"
//                   rows="5"
//                 ></TextareaField>
//                 <SubmitButton text={"submit"} />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import InputField from "../ui/form/InputField";
import SubmitButton from "../ui/form/SubmitButton";
import TextareaField from "../ui/form/TextareaField";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="container">
      <div className="contact">
        <div className="contact-header">
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
        </div>
        <div className="contact-wrapper">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="contact-info-wrapper">
                <div>
                  <h3>{t("contact.contactInfoTitle")}</h3>
                  <p>{t("contact.contactInfoDescription")}</p>
                </div>
                <div className="contact-info">
                  <p>
                    <i className="fa-solid fa-phone"></i>
                    <span> {t("contact.phone")}: +1 123 456 7890</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-envelope"></i>
                    <span> {t("contact.email")}: example@gmail.com</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>
                      {" "}
                      {t("contact.location")}: 123 Main St, City, Country
                    </span>
                  </p>
                </div>
                <div className="social-media-links">
                  <Link>
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link>
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link>
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link>
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form className="contact-form">
                <InputField
                  label={t("contact.name")}
                  type="text"
                  placeholder={t("contact.name")}
                />
                <InputField
                  label={t("contact.email")}
                  type="email"
                  placeholder={t("contact.email")}
                />
                <InputField
                  label={t("contact.subject")}
                  type="text"
                  placeholder={t("contact.subject")}
                />
                <TextareaField
                  label={t("contact.message")}
                  placeholder={t("contact.message")}
                  rows="5"
                ></TextareaField>
                <SubmitButton text={t("contact.submit")} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
