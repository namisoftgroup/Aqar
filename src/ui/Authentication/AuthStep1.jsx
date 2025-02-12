import { useTranslation } from "react-i18next";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import { sendOtpCode } from "../../apiServices/auth";

export default function AuthStep1({ formData, setFormData, setOtp }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  function handleChange(e) {
    setFormData((prevFormData) => ({ ...prevFormData, phone: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const reqBody = formData;
    try {
      const data = await sendOtpCode(reqBody);
      console.log(data);

      if (data.code === 200)
        setOtp((prev) => ({
          ...prev,
          hashed_code: data.data,
          phone: formData.phone,
        }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setFormData({ phone: "" });
      dispatch(setStep(2));
    }
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
