import { useTranslation } from "react-i18next";
import TransactionsTable from "../ui/wallet/TransactionsTable";
import { useState } from "react";
import ChargeModal from "../ui/modals/ChargeModal";
import { useGetWalletOperations } from "../hooks/wallet/useGetWalletOperations";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import { useSelector } from "react-redux";

export default function Wallet() {
  const { t } = useTranslation();
  const [ShowChargeModal, setShowChargeModal] = useState();
  const { walletOperations, isLoading } = useGetWalletOperations();
  const { user } = useSelector((state) => state.user);

  if (isLoading) return <DataLoader />;

  if (!walletOperations && walletOperations.length === 0)
    return <EmptyData text={"There is no prevous operations"} />;
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
                    {user.wallet}
                    <span> ر.س </span>
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
                {walletOperations && walletOperations.lenght > 0 ? (
                  <TransactionsTable walletOperations={walletOperations} />
                ) : (
                  <EmptyData text="You Do not have any wallet operations " />
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
