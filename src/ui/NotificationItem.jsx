export default function NotificationItem({ notification }) {
  return (
    <div className="notification-item">
      <div className="notification-content">
        <div className="notification-icon">{notification.icon}</div>
        <div className="notification-details">
          <div className="notification-category">{notification.category}</div>
          <div className="notification-message">{notification.message}</div>
        </div>
      </div>
      <p className="notification-date">{notification.date}</p>
    </div>
  );
}
