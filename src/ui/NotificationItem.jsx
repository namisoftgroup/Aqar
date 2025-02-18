import { formateDateDetails } from "../utils/helper";

export default function NotificationItem({ notification }) {
  return (
    <div className="notification-item">
      <div className="notification-content">
        <div className="notification-icon">
          <img src="/images/logo1.jpeg" />
        </div>
        <div className="notification-details">
          <div className="notification-category">{notification.title}</div>
          <div className="notification-message">{notification.description}</div>
        </div>
      </div>
      <p className="notification-date">
        {formateDateDetails(new Date(notification.created_at))}
      </p>
    </div>
  );
}
