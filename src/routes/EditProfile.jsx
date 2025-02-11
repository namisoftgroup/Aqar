import { useRef, useState } from "react";
import InputField from "../ui/form/InputField";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form/SubmitButton";

export default function EditProfile() {
  const [formData, setFormData] = useState();
  const lang = useSelector((state) => state.language.lang);
  const [loading, setIsLoading] = useState();
  const { t } = useTranslation();
  const imgView = useRef(null);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <section className="container my-5">
      <section className="auth-step w-50 mx-auto">
        <h1>{t("profile.editProfile")}</h1>
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

          <SubmitButton
            style={{ width: "fit-content" }}
            text={t("profile.edit")}
            loading={loading}
          />
        </form>
      </section>
    </section>
  );
}
