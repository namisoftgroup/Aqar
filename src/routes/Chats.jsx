import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import chatLottie from "../assets/lotties/chat.json";
import { useGetChatDetails } from "../hooks/chats/useGetChatDetails";
import { useGetChats } from "../hooks/chats/useGetChats";
import ChatRoom from "../ui/Chats/ChatRoom";
import ChatSideBar from "../ui/Chats/ChatSidebar";
import DataLoader from "../ui/DataLoader";

export default function Chats() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
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
  return (
    <section className="chat-section">
      <div className="container d-block">
        <button className="openTaps" onClick={() => setShowChatsMenu(true)}>
          <i className="fa-regular fa-comments"></i>
          <span> {t("header.chat")} </span>
        </button>
        <div className="row">
          {chats?.length > 0 ? (
            <>
              <div className="col-lg-4 col-12 p-2">
                <ChatSideBar
                  chats={chats}
                  setTargetChat={setTargetChat}
                  targetChat={targetChat}
                  showChatsMenu={showChatsMenu}
                  setShowChatsMenu={setShowChatsMenu}
                />
              </div>
              <div className="col-lg-8 col-12 p-2">
                {targetChat ? (
                  <>
                    {isChatLoading ? (
                      <div className="lottie_player_holder">
                        <Lottie
                          options={defaultOptions}
                          height={250}
                          width={250}
                        />
                      </div>
                    ) : (
                      <ChatRoom chat={chatDetails} />
                    )}
                  </>
                ) : (
                  <div className="chat-replce">
                    <img src="images/comment.jpg" alt="No chat selected" />
                    <h5>{t("noChatSelected")}</h5>
                    <p>{t("startConversation")}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="lottie_player_holder">
              <Lottie options={defaultOptions} height={250} width={250} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
