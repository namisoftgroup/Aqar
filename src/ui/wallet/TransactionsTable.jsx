import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formateDateDetails } from "../../utils/helper";

export default function TransactionsTable({ walletOperations }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const locale = lang === "ar" ? "ar-EG" : "en-US";
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
          {walletOperations.map((tx) => (
            <tr key={tx.id}>
              <td className="transaction-type">
                {tx.type === "deposit" ? (
                  <span className="icon deposit">
                    <i className="fa-solid fa-caret-up"></i>
                  </span>
                ) : (
                  <span className="icon withdraw">
                    <i className="fa-solid fa-caret-down"></i>
                  </span>
                )}
                <span>{tx.type === "deposit" ? "إيداع" : "خصم"}</span>
              </td>
              <td>{formateDateDetails(new Date(tx.created_at), locale)}</td>
              <td className="transaction-amount">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
