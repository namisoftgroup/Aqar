import { Link } from "react-router";
import {
  extractTextAfterMessages,
  formatMessageTime,
} from "../../utils/helper";
import { useSelector } from "react-redux";

export default function MessageBubble({ message, fileName }) {
  const user = useSelector((state) => state.user.user);
  return (
    <div className={`chat-bubble ${message.from_id === user?.id ? "me" : ""}`}>
      {message.type === "text" && (
        <span className="chat-text">{message.message}</span>
      )}
      {message.type === "audio" && (
        <audio
          controls
          src={
            message.message instanceof Blob
              ? URL.createObjectURL(message.message)
              : message.message
          }
        />
      )}
      {message.type === "image" && (
        <img
          style={{ width: "300px", objectFit: "contain", aspectRatio: "auto" }}
          src={
            message.message instanceof Blob
              ? URL.createObjectURL(message.message)
              : message.message
          }
          alt=""
        />
      )}
      {message.type === "file" && (
        <Link to={message.message} target="_blank">
          <div className="doc_message">
            <p>{extractTextAfterMessages(message.message, fileName)}</p>
            <div className="icon">
              <i className="fa-regular fa-file"></i>
            </div>
          </div>
        </Link>
      )}
      <span className="chat-time">{formatMessageTime(message.created_at)}</span>
    </div>
  );
}
