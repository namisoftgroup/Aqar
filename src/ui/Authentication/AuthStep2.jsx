import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useCheckCode } from "../../hooks/auth/useCheckCode";
import { setStep } from "../../redux/slices/authModalSlice";
import OtpContainer from "../form/OtpContainer";
import SubmitButton from "../form/SubmitButton";
import ResendCode from "./ResendCode";

export default function AuthStep2({ otp, setOtp, formData }) {
  const { t } = useTranslation();
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const { checkCode, isPending } = useCheckCode();

  async function handleSubmit(e) {
    e.preventDefault();

    const reqBody = { ...otp, login: 1 };
    checkCode(reqBody);
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
        <h1>
          <span>{t("auth.confirmOtp")}</span>
          <span> {formData?.phone}</span>
        </h1>
        <form onSubmit={handleSubmit} className="form">
          <OtpContainer
            type="number"
            placeholder={t("auth.phoneNumber")}
            formData={otp}
            setFormData={setOtp}
          />
          <ResendCode />
          <SubmitButton text={t("auth.confirm")} loading={isPending} />
        </form>
      </section>
    </section>
  );
}
