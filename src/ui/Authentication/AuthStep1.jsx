import { useTranslation } from "react-i18next";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";

export default function AuthStep1({ formData, setFormData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  function handleChange(e) {
    setFormData((prevFormData) => ({ ...prevFormData, phone: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(setStep(2));
  }

  return (
    <section className="col-6 auth-step">
      <h1>{t("auth.wellcome")}</h1>
      <form onSubmit={handleSubmit} className="form">
        <InputField
          required
          name="phone"
          onChange={handleChange}
          type="number"
          placeholder={t("auth.phoneNumber")}
        />
        <SubmitButton text={t("auth.enter")} loading={loading} />
      </form>
    </section>
  );
}
