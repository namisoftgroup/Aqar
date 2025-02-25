import { useTranslation } from "react-i18next";
import ChatRoom from "../ui/Chats/ChatRoom";
import { useEffect, useState } from "react";
import { useGetChats } from "../hooks/chats/useGetChats";
import DataLoader from "../ui/DataLoader";
import { truncateText } from "../utils/helper";
import { useGetChatDetails } from "../hooks/chats/useGetChatDetails";
import Lottie from "react-lottie";
import chatLottie from "../assets/lotties/chat.json";

export default function Chat() {
  const { t } = useTranslation();

  const [adId, setAdId] = useState(sessionStorage.getItem("ad_id") || "");
  const [ownerId, setOwnerId] = useState(
    sessionStorage.getItem("owner_id") || ""
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("user_id") || "");
  const [targetChat, setTargetChat] = useState(null);

  const { chats, isLoading } = useGetChats();

  const { chatDetails, isLoading: isChatLoading } = useGetChatDetails({
    ad_id: adId,
    owner_id: ownerId,
    user_id: userId,
    orderBy: "asc",
  });

  useEffect(() => {
    if (chatDetails?.id) {
      setTargetChat(chatDetails);
    } else {
      setTargetChat(null);
    }
  }, [chatDetails]);

  const handleChatSelection = (msg) => {
    sessionStorage.setItem("ad_id", msg?.ad_id);
    sessionStorage.setItem("user_id", msg?.user_id);
    sessionStorage.setItem("owner_id", msg?.owner_id);

    setAdId(msg?.ad_id);
    setOwnerId(msg?.owner_id);
    setUserId(msg?.user_id);

    setTargetChat(msg);
  };

  if (isLoading) return <DataLoader />;

  const renderLastMessage = (msg) => {
    if (!msg.last_message) return null;

    if (msg.last_message.type === "audio") {
      return (
        <>
          <i className="fa-light fa-microphone"></i> {msg.last_message.duration}
        </>
      );
    } else if (msg.last_message.type === "text") {
      return truncateText(msg.last_message.message);
    }
    return null;
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="chat-container">
      <div className="container">
        <div className="chat-wrapper">
          <div className="row">
            {/* Chat List */}
            <div className="col-md-4 p-0">
              <h5 className="messages-title">{t("chat.messages")}</h5>
              <div className="messages-list scrollbar-styles">
                <ul>
                  {chats.map((msg) => (
                    <li
                      key={msg.id}
                      className={`message-item ${
                        targetChat?.id === msg.id ? "active" : ""
                      }`}
                      onClick={() => handleChatSelection(msg)}
                    >
                      <div className="message-content">
                        <div className="message-data">
                          <img
                            src={msg.owner?.image}
                            alt={msg.owner?.name || "User"}
                            className="user-img"
                          />
                          <div>
                            <div className="message-name">
                              {msg.owner?.name}
                            </div>
                            <div className="message-text">
                              {renderLastMessage(msg)}
                            </div>
                          </div>
                        </div>
                        <div className="message-date">{msg.date}</div>
                      </div>

                      {msg?.ad && (
                        <div className="message-property-data">
                          <p>
                            {msg?.ad?.title} , {msg?.ad?.address}
                          </p>
                          <img
                            src={msg?.ad?.image}
                            alt={msg?.ad?.title || "Ad Image"}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chat Room */}
            <div className="col-md-8 pe-0">
              {targetChat ? (
                isChatLoading ? (
                  <div className="lottie_player_holder">
                    <Lottie options={defaultOptions} height={250} width={250} />
                  </div>
                ) : (
                  <ChatRoom chat={chatDetails} />
                )
              ) : (
                <div className="chat-replce">
                  <img src="/images/comments.png" alt="No chat selected" />
                  <h5>{t("noChatSelected")}</h5>
                  <p>{t("startConversation")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
