// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSendOtp } from "../../hooks/auth/useSendOtp";
// import { setStep } from "../../redux/slices/authModalSlice";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";

// export default function ResendCode({ formData ,setOtp }) {
//   const { t } = useTranslation();
//   const [timer, setTimer] = useState(59);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const { sendOtp, isPending } = useSendOtp();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else {
//       setResendDisabled(false);
//     }
//   }, [timer]);
//   function handleResendCode() {
//     const reqBody = { phone: formData.phone };
//     sendOtp(reqBody, {
//       onSuccess: (data) => {
//         setOtp((prev) => ({
//           ...prev,
//           hashed_code: data.data,
//           phone: formData.phone,
//         }));
//         dispatch(setStep(2));
//         toast.success("code send to phone number ");
//       },
//       onError: (error) => {
//         console.error(error);
//       },
//     });
//   }
//   return (
//     <div className="resend-code">
//       <span
//         onClick={handleResendCode}
//         className={`resend_link ${
//           resendDisabled || isPending ? "disabled" : ""
//         }`}
//       >
//         {t("auth.resendCode")}
//       </span>
//       <div className="timer">
//         <span>
//           {Math.floor(timer / 60)
//             .toString()
//             .padStart(2, "0")}
//         </span>
//         : <span>{(timer % 60).toString().padStart(2, "0")}</span>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSendOtp } from "../../hooks/auth/useSendOtp";
import { setStep } from "../../redux/slices/authModalSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export default function ResendCode({ formData, setOtp }) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(59);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { sendOtp, isPending } = useSendOtp();
  const dispatch = useDispatch();

  // Timer countdown
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  function handleResendCode() {
    if (resendDisabled || isPending) return;

    const reqBody = { phone: formData.phone };
    sendOtp(reqBody, {
      onSuccess: (data) => {
        setOtp((prev) => ({
          ...prev,
          hashed_code: data.data,
          phone: formData.phone,
        }));
        dispatch(setStep(2));
        toast.success("Code sent to phone number");

        // Reset timer and disable resend
        setTimer(59);
        setResendDisabled(true);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to resend code. Please try again.");
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
        style={{
          cursor: resendDisabled || isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? t("auth.sendingCode") : t("auth.resendCode")}
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
