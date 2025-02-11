import { useTranslation } from "react-i18next";
import TransactionsTable from "../ui/wallet/TransactionsTable";
import { useState } from "react";
import ChargeModal from "../ui/modals/ChargeModal";

export default function Wallet() {
  const { t } = useTranslation();
  const [ShowChargeModal, setShowChargeModal] = useState();
  return (
    <>
      <section className="container my-5">
        <div className="wallet">
          <h2 className="wallet-header"> {t("wallet.myWallet")} </h2>
          <div className="row g-3 mt-4">
            <div className="col-lg-4">
              <div className="balance-card">
                <div className="balance">
                  <img src="/images/balance.png" alt="balance-background" />
                  <p>
                    2,500<span> ر.س </span>
                  </p>
                </div>

                <button
                  className="main-btn"
                  onClick={() => setShowChargeModal(true)}
                >
                  {t("wallet.charge")}
                </button>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="transactions-table">
                <h3>{t("wallet.previousTransactions")}</h3>
                <TransactionsTable />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChargeModal
        setShowModal={setShowChargeModal}
        showModal={ShowChargeModal}
      />
    </>
  );
}
