import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useUpdateProfile } from "../hooks/profile/useUpdateProfile";
import InputField from "../ui/form/InputField";
import SubmitButton from "../ui/form/SubmitButton";

export default function EditProfile() {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const imgView = useRef(null);
  const user = useSelector((state) => state.user.user);
  const { editProfile, isPending } = useUpdateProfile();
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
  }, [user]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    imgView.current.src = imageUrl;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    editProfile(formDataToSend);
  }

  return (
    <section className="container my-5">
      <section className="auth-step w-50 mx-auto">
        <h1>{t("profile.editProfile")}</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="image" className="image-uplaod">
            <img
              ref={imgView}
              src={user.image ? user.image : "images/registerImage.png"}
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
            value={formData?.name}
            requried="true"
            type="text"
            name="name"
            placeholder={t("auth.name")}
          />
          <InputField
            onChange={handleChange}
            requried="true"
            value={formData?.email}
            type="email"
            name="email"
            placeholder={t("auth.email")}
          />

          <SubmitButton
            style={{ width: "fit-content" }}
            text={t("profile.edit")}
            loading={isPending}
          />
        </form>
      </section>
    </section>
  );
}
