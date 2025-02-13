import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSendOtp } from "../../hooks/auth/useSendOtp";
import { setStep } from "../../redux/slices/authModalSlice";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

export default function AuthStep1({ formData, setFormData, setOtp }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, phone: e.target.value }));
  }
  const { sendOtp, isLoading } = useSendOtp();

  async function handleSubmit(e) {
    e.preventDefault();
    const reqBody = { phone: formData.phone };
    sendOtp(reqBody, {
      onSuccess: (data) => {
        setOtp((prev) => ({
          ...prev,
          hashed_code: data.data,
          phone: formData.phone,
        }));
        dispatch(setStep(2));
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  return (
    <>
      <h1>{t("auth.wellcome")}</h1>
      <form onSubmit={handleSubmit} className="form">
        <InputField
          required
          name="phone"
          onChange={handleChange}
          type="number"
          placeholder={t("auth.phoneNumber")}
        />
        <SubmitButton text={t("auth.enter")} loading={isLoading} />
      </form>
    </>
  );
}
