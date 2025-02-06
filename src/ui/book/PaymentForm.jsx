import { useTranslation } from "react-i18next";
import InputField from "../form/InputField";

export default function PaymentForm() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="payment-form-header">
        <h4>{t("book.payment")}</h4>
        <img src="/images/visa-fill.png" />
      </div>
      <form className="book-form">
        <InputField label={t("book.cardNumber")} />
        <div className=" d-flex align-items-center gap-3">
          <InputField label={t("book.expiryDate")} />
          <InputField label={t("book.cvv")} />
        </div>
        <div className="billing-address">
          <h4>{t("book.billaAddress")}</h4>
          <InputField label={t("book.street")} />
          <InputField label={t("book.suitOrflat")} />
          <InputField label={t("book.city")} />{" "}
          <div className="d-flex align-items-center gap-3">
            <InputField label={t("book.state")} />
            <InputField label={t("book.ZIP")} />
          </div>
        </div>
      </form>
    </section>
  );
}
