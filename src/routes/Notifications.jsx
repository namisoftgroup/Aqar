import { useTranslation } from "react-i18next";
import { useGetNotifications } from "../hooks/useGetNotifications";
import NotificationItem from "../ui/NotificationItem";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

export default function Notifications() {
  const { t } = useTranslation();
  const { notifications, isLoading } = useGetNotifications();

  if (isLoading) return <DataLoader />;
  if (!notifications && notifications.length === 0)
    return <EmptyData text={"There is No Notificaions Yet"} />;
  return (
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12 p-2">
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
        </div>
      </div>
    </section>
  );
}
