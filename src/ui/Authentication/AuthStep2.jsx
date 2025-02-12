import { useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { checkCode } from "../../apiServices/auth";
import { setStep } from "../../redux/slices/authModalSlice";
import { setUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../utils/axios";
import OtpContainer from "../form/OtpContainer";
import SubmitButton from "../form/SubmitButton";
import ResendCode from "./ResendCode";

export default function AuthStep2({ otp, setOtp, formData }) {
  const { t } = useTranslation();
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const lang = useSelector((state) => state.language.lang);
  const [loading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(otp);
    setIsLoading(true);
    const reqBody = { ...otp, login: 1 };
    try {
      const data = await checkCode(reqBody);
      if (data.code === 200) {
        dispatch(setUser(data.data));
        setCookie("token", data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setCookie("id", data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${data.data.token}`;
        dispatch(setStep(3));
        toast("login success");
      } else {
        toast(data.message);
        return;
      }
    } catch (e) {
      console.error(e);
      toast("An error occurred during requesr, please try again later.");
      return;
    } finally {
      setIsLoading(false);
    }
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
          <SubmitButton text={t("auth.confirm")} loading={loading} />
        </form>
      </section>
    </section>
  );
}
