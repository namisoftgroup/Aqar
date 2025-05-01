import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSendOtp } from "../../hooks/auth/useSendOtp";
import { setStep } from "../../redux/slices/authModalSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export default function ResendCode({ formData ,setOtp }) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(59);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { sendOtp, isPending } = useSendOtp();
  const dispatch = useDispatch();
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);
  function handleResendCode() {
    const reqBody = { phone: formData.phone };
    sendOtp(reqBody, {
      onSuccess: (data) => {
        setOtp((prev) => ({
          ...prev,
          hashed_code: data.data,
          phone: formData.phone,
        }));
        dispatch(setStep(2));
        toast.success("code send to phone number ");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }
  return (
    <div className="resend-code">
      <span
        onClick={handleResendCode}
        className={`resend_link ${
          resendDisabled || isPending ? "disabled" : ""
        }`}
      >
        {t("auth.resendCode")}
      </span>
      <div className="timer">
        <span>
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, "0")}
        </span>
        : <span>{(timer % 60).toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
}
