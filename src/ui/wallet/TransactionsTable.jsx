import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const transactions = [
  { id: 1, type: "deposit", amount: "30 رس", date: "6 أكتوبر" },
  { id: 2, type: "withdraw", amount: "30 رس", date: "6 أكتوبر" },
];

export default function TransactionsTable() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className="transactions-container">
      <table className={`transactions-table ${lang === "en" ? "en" : ""}`}>
        <thead>
          <tr>
            <th>{t("wallet.transaction")}</th>
            <th>التاريخ</th>
            <th>المبلغ</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
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
              <td>{tx.date}</td>
              <td className="transaction-amount">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
