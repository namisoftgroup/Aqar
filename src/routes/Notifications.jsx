import React from "react";
import NotificationItem from "../ui/NotificationItem";
import { useTranslation } from "react-i18next";

const notifications = [
  {
    id: 1,
    category: "المحفظة",
    message: "تم إيداع مبلغ 200 رس",
    date: "04/11/2024",
    icon: <i className="fa-solid  fa-wallet"></i>,
  },
  {
    id: 2,
    category: "الحجوزات",
    message: "تم حجز غرفتك رقم 35345",
    date: "04/11/2024",
    icon: <i className="fa-solid  fa-wallet"></i>,
  },
];
export default function Notifications() {
  const { t } = useTranslation();
  return (
    <section className="container my-5">
      <div className="notifications-container">
        <h2 className="notifications-title">
          {t("notifications.notifications")}
        </h2>
        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
