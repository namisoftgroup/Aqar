import { useTranslation } from "react-i18next";

export default function ChooseHowToPay({ selected, setSelected }) {
  const { t } = useTranslation();

  return (
    <section className="chooseHowToPay">
      <h4>{t("book.howToPay")}</h4>
      <form className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="radio"
            value="all"
            checked={selected === "all"}
            onChange={() => setSelected("all")}
          />
          <span className="custom-radio"></span>
          {t("book.pay")} 20000 {t("book.now")}
        </label>

        <label className="radio-label">
          <input
            type="radio"
            name="radio"
            value="part"
            checked={selected === "part"}
            onChange={() => setSelected("part")}
          />
          <span className="custom-radio"></span>
          {t("book.payPart")} <br /> 130 due to today , 99 on Apr 24, 2025 .No
          extra Fees
        </label>
      </form>
    </section>
  );
}
