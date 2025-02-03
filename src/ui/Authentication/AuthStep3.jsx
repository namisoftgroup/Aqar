import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

export default function AuthStep3({ formData, setFormData }) {
  const { t } = useTranslation();
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const lang = useSelector((state) => state.language.lang);
  const imgView = useRef(null);
  const [loading, setIsLoading] = useState();
  const dispatch = useDispatch();
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  // useEffect(() => {
  //   if (formData.image) {
  //     imgView.current.src = formData.image;
  //   }
  // }, [formData.image]);
  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <section className="col-6 d-flex justify-content-between flex-column  ">
      <button
        className={`back-button  ${lang === "en" ? "en" : ""} `}
        onClick={() => dispatch(setStep(currentStep - 1))}
      >
        <i
          className={`fa-solid ${
            lang === "en" ? "fa-chevron-left" : "fa-chevron-right"
          }  `}
        ></i>
      </button>
      <section className="auth-step flex-grow-1">
        <h1>{t("auth.completeYourdata")}</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="image" className="image-uplaod">
            <img
              ref={imgView}
              src="images/registerImage.png"
              alt="your avatar"
            />
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleUpload}
            />
            <i className="fa-solid fa-plus"></i>
          </label>
          <InputField
            onChange={handleChange}
            requried="true"
            type="text"
            name="name"
            placeholder={t("auth.name")}
          />
          <InputField
            onChange={handleChange}
            requried="true"
            type="email"
            name="email"
            placeholder={t("auth.email")}
          />

          <SubmitButton text={t("auth.next")} loading={loading} />
        </form>
      </section>
    </section>
  );
}
