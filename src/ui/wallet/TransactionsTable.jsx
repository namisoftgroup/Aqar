
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formateDateDetails } from "../../utils/helper";

export default function TransactionsTable({ walletOperations }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const locale = lang === "ar" ? "ar-EG" : "en-US";

  const getTransactionLabel = (type) => {
    switch (type) {
      case "buy":
        return { sign: "-", label: t("wallet.buy"), icon: "fa-caret-down" };
      case "charge":
        return { sign: "+", label: t("wallet.charge"), icon: "fa-caret-up" };
      case "refund":
        return { sign: "+", label: t("wallet.refund"), icon: "fa-caret-up" };
      case "withdraw":
        return {
          sign: "-",
          label: t("wallet.withdraw"),
          icon: "fa-caret-down",
        };
      default:
        return { sign: "", label: t("wallet.unknown"), icon: "" };
    }
  };

  return (
    <div className="transactions-container">
      <table className={`transactions-table ${lang === "en" ? "en" : ""}`}>
        <thead>
          <tr>
            <th>{t("wallet.transaction")}</th>
            <th>{t("wallet.date")}</th>
            <th>{t("wallet.price")}</th>
          </tr>
        </thead>
        <tbody>
          {walletOperations.map((tx) => {
            const { sign, label, icon } = getTransactionLabel(tx.operation);
            return (
              <tr key={tx.id}>
                <td className="transaction-type">
                  <span
                    className={`icon ${sign === "+" ? "deposit" : "withdraw"}`}
                  >
                    <i className={`fa-solid ${icon}`}></i>
                  </span>
                  <span>{label}</span>
                </td>
                <td>{formateDateDetails(new Date(tx.created_at), locale)}</td>
                <td className="transaction-amount">{tx.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
