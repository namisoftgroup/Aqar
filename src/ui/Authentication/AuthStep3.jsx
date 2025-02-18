import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { closeAuthModal, setStep } from "../../redux/slices/authModalSlice";
import { setUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../utils/axios";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

export default function AuthStep3() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const lang = useSelector((state) => state.language.lang);
  const imgView = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [loading, setIsLoading] = useState();
  const dispatch = useDispatch();
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    if (formData.image) {
      imgView.current.src = formData.image;
    }
  }, [formData.image]);
  const handleUpload = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    imgView.current.src = imageUrl;
    setFormData({ ...formData, [e.target.name]: imageUrl });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const reqBody = formData;
    try {
      const res = await axiosInstance.post("user/update_profile", reqBody);
      if (res.data.code === 200) {
        dispatch(setUser(res.data.data));
        toast.success("Profile updated successfully");
        
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
      dispatch(closeAuthModal());
    }
  }

  return (
    <section className=" d-flex justify-content-between flex-column  ">
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
            <img ref={imgView} src={user.image} alt="your avatar" />
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
