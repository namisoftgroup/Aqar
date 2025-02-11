import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Profile() {
  const user = {
    image: "/images/avatar.png",
    name: "محمد احمد",
    phone: "+1 234 567 890",
    walletBalance: "250.00 ر.س",
  };
  const { t } = useTranslation();
  return (
    <section className="profile">
      <div className="top-section"></div>
      <div className="container">
        <div className="profile-container">
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
          <div className="profile-cards">
            <Link to="/wallet">
              <div className="profile-card">
                <h3 className="wallet-balance">{user.walletBalance}</h3>
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
  );
}
