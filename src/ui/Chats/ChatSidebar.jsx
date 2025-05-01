import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatMessageTime } from "../../utils/helper";
import { useNavigate } from "react-router";

const ChatSideBar = ({
  setShowChatsMenu,
  showChatsMenu,
  chats,
  targetChat,
  setTargetChat,
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function truncate(inputString) {
    if (!inputString) return "";
    return inputString.length > 35
      ? inputString.substring(0, 35) + "..."
      : inputString;
  }

  return (
    <div className={`side-menu-chat p-2 pt-3 ${showChatsMenu ? "active" : ""}`}>
      <div className="colse" onClick={() => setShowChatsMenu(false)}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
      {chats && chats.length > 0 ? (
        chats?.map((chat) => (
          <button
            className={`nav-link ${
              targetChat?.id === chat?.id ? "active" : ""
            }`}
            key={chat?.id}
            onClick={() => {
              sessionStorage.setItem("ad_id", chat?.ad_id || "");
              sessionStorage.setItem("owner_id", chat?.owner_id || "");
              sessionStorage.setItem("user_id", chat?.user_id || "");
              setTargetChat(chat);
              setShowChatsMenu(false);
            }}
          >
            <div className="user-data">
              <img
                className="userImg"
                onClick={() => navigate(`/ads/${chat?.owner_id}`)}
                src={
                  chat?.user
                    ? chat?.user?.id === user?.id
                      ? chat?.owner?.image || "/images/avatar.jpg"
                      : chat?.user?.image || "/images/avatar.jpg"
                    : "/images/deleted-account.jpg"
                }
                alt="user"
              />
              <div className="text-wrap">
                <h6 className="name">
                  {chat?.user
                    ? chat?.user?.id === user?.id
                      ? chat?.owner?.name || t("chat.unknownUser")
                      : chat?.user?.name || t("chat.unknownUser")
                    : t("chat.deletedAccount")}
                </h6>
                <p className="lastMessage unread">
                  {chat?.last_message?.type !== "text" ? (
                    <div className="icon">
                      <i className="fa fa-paperclip" aria-hidden="true"></i>{" "}
                      <span>{t("chat.attachment")}</span>
                    </div>
                  ) : (
                    truncate(chat?.last_message?.message)
                  )}
                  {chat?.last_message?.from_id === user?.id && (
                    <span className="read">
                      {(chat?.user?.id === user?.id &&
                        chat?.last_message?.is_read_owner === 1) ||
                      (chat?.user?.id !== user?.id &&
                        chat?.last_message?.is_read_user === 1) ? (
                        <i className="fa-regular fa-check-double"></i>
                      ) : (
                        <i className="fa-regular fa-check"></i>
                      )}
                    </span>
                  )}
                </p>
                <span className="time" dir="ltr">
                  {chat?.last_message?.created_at
                    ? formatMessageTime(chat?.last_message?.created_at)
                    : ""}
                </span>
              </div>
            </div>
            <div>
              {chat?.ad && (
                <div
                  onClick={() => navigate(`/for-rent/${chat.ad.id}`)}
                  className="message-property-data"
                >
                  <p>
                    {chat?.ad?.title} , {chat?.ad?.address}
                  </p>
                  <img
                    src={chat?.ad?.image}
                    alt={chat?.ad?.title || "Ad Image"}
                  />
                </div>
              )}
            </div>
          </button>
        ))
      ) : (
        <p>There is no chats yet</p>
      )}
    </div>
  );
};

export default ChatSideBar;
