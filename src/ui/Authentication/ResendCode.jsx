import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ResendCode() {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(59);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="resend-code">
      <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
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
