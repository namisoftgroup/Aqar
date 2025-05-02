import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetWalletOperations } from "../hooks/wallet/useGetWalletOperations";
import TransactionsTable from "../ui/wallet/TransactionsTable";
import ChargeModal from "../ui/modals/ChargeModal";
import DataLoader from "../ui/DataLoader";

export default function Wallet() {
  const { t } = useTranslation();
  const [ShowChargeModal, setShowChargeModal] = useState();
  const { walletOperations, isLoading } = useGetWalletOperations();
  const { user } = useSelector((state) => state.user);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <section className="wallet">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12 p-2">
              <div className="balance-card">
                <div className="balance">
                  <img src="/images/balance.svg" alt="balance-background" />
                  <p>
                    {user.wallet}
                    <span>{t("sar")}</span>
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
            <div className="col-lg-8 col-12 p-2">
              <div className="transactions-table">
                <h3>{t("wallet.previousTransactions")}</h3>
                {walletOperations && walletOperations.length > 0 ? (
                  <TransactionsTable walletOperations={walletOperations} />
                ) : (
                  <div className="noData">{t("wallet.noOperations")}</div>
                )}
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
