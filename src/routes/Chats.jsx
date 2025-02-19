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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { t } = useTranslation();
  const [targetChat, setTargetChat] = useState(null);
  const { chats, isLoading } = useGetChats();
  const { chatDetails, isLoading: isChatLoading } = useGetChatDetails({
    ad_id: sessionStorage.getItem("ad_id"),
    owner_id: sessionStorage.getItem("owner_id"),
    user_id: sessionStorage.getItem("user_id"),
    orderBy: "asc",
  });

  useEffect(() => {
    if (chatDetails?.id) {
      setTargetChat(chatDetails);
    } else {
      setTargetChat(null);
    }
  }, [chatDetails]);

  if (isLoading) return <DataLoader />;

  const renderLastMessage = (msg) => {
    if (msg.last_message.type === "audio") {
      return (
        <>
          <i className="fa-light fa-microphone"></i> {msg.last_message.duration}{" "}
        </>
      );
    } else if (msg.last_message.type === "text") {
      return truncateText(msg.last_message.message);
    }
    return null;
  };

  return (
    <section className="chat-container">
      <div className="container">
        <div className="chat-wrapper">
          <div className="row">
            <div className="col-md-4 p-0">
              <h5 className="messages-title">{t("chat.messages")}</h5>
              <div className="messages-list scrollbar-styles">
                <ul>
                  {chats.map((msg) => (
                    <li
                      key={msg.id}
                      className="message-item"
                      onClick={() => {
                        sessionStorage.setItem("ad_id", msg?.ad_id);
                        sessionStorage.setItem("user_id", msg?.user_id);
                        sessionStorage.setItem("owner_id", msg?.owner_id);
                        setTargetChat(msg);
                      }}
                    >
                      <div className="message-content">
                        <div className="message-data">
                          <img
                            src={msg.owner?.image}
                            alt={msg.owner?.name}
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
                          <p className="">
                            {msg?.ad?.title} , {msg?.ad?.address}
                          </p>
                          <img className="" src={msg?.ad?.image} />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-8 pe-0">
              {targetChat ? (
                <>
                  {isChatLoading ? (
                    <DataLoader />
                  ) : (
                    <ChatRoom chat={chatDetails} />
                  )}
                </>
              ) : (
                <div className="lottie_player_holder">
                  <Lottie options={defaultOptions} height={250} width={250} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
