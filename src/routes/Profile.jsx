import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import DeleteAccountModal from "../ui/modals/DeleteAccountModal";
import DataLoader from "../ui/DataLoader";

export default function Profile() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <section className="profile">
        <div className="top-section"></div>
        <div className="container">
          <div className="profile-container">
            <div className="user-wrapper">
              <div className="user">
                <img src={user.image} alt="User" className="profile-image" />
                <div className="info">
                  <h2 className="profile-name">
                    {t("profile.hi")}, {user.name}
                  </h2>
                  <p className="profile-phone">
                    <i className="fa-light fa-phone"></i> {user.phone}
                  </p>
                </div>
              </div>
              <div className="setting">
                <Link to="/edit-profile" className="edit-button">
                  {t("profile.editProfile")}
                </Link>
                <button
                  onClick={() => setOpenDeleteModal(true)}
                  className="delete"
                >
                  {t("profile.deleteAccount")}
                </button>
              </div>
            </div>
            <div className="profile-cards">
              <Link to="/wallet">
                <div className="profile-card">
                  <h3 className="wallet-balance">{user.wallet}</h3>
                  <p>{t("profile.yourBalance")}</p>
                </div>
              </Link>
              <Link to="/bookings">
                <div className="profile-card">
                  <h3 className="wallet-balance">6</h3>
                  <p>{t("profile.yourBookings")}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeleteAccountModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
}
