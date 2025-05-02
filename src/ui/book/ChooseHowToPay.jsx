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
            checked={selected === "wallet"}
            onChange={() => setSelected("wallet")}
          />
          <span className="custom-radio"></span>
          {t("book.wallet")}
        </label>

        {/* <label className="radio-label">
          <input
            type="radio"
            name="radio"
            value="part"
            checked={selected === "online"}
            onChange={() => setSelected("online")}
          />
          <span className="custom-radio"></span>
          {t("book.online")} <br />
        </label> */}
      </form>
    </section>
  );
}
