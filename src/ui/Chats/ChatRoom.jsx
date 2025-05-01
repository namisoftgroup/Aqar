import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { createMessage } from "../../apiServices/apiChats";
import { formatMessageTime } from "../../utils/helper";

const ChatRoom = ({ chat, chats }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState({
    from_id: null,
    chat_id: null,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const socketRef = useRef(null);
  const queryClient = useQueryClient();

  const channel = chat?.id ? `chat_${chat.id}` : null;

  useEffect(() => {
    if (!chat?.id) return;

    const socket = new WebSocket(
      "wss://api.noot.com.sa/app/f4vqjzd4e4bs0ikazefo?protocol=7&client=js&version=8.4.0&flash=false"
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: { channel },
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.event === "new_message") {
          const messageData = JSON.parse(payload.data);
          if (messageData?.message?.chat_id) {
            setMessages((prev) => [...prev, messageData.message]);
          }
        }
      } catch (err) {
        console.error("WebSocket message parsing error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = (event) => {
      console.warn("WebSocket closed:", event);
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, [chat?.id, channel]);

  useEffect(() => {
    if (chat) {
      setMessages(chat?.messages?.slice() || []);
      setMessage((prev) => ({
        ...prev,
        from_id: user?.id,
        chat_id: chat?.id,
      }));
    }
  }, [chat, user?.id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message?.type === "") return;

    setLoading(true);
    formRef.current.reset();

    try {
      const data = await createMessage(message);

      if (data.code === 200 && chats === 0) {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage({
        from_id: user?.id,
        chat_id: chat?.id,
        message: "",
        type: "",
      });
      setRecordingTime(0);
      setLoading(false);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setMessage((prev) => ({
          ...prev,
          message: audioBlob,
          type: "audio",
        }));

        mediaRecorderInstance.stream
          .getTracks()
          .forEach((track) => track.stop());
        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
      };

      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
      startRecordingTimer();
    } catch (err) {
      console.error("Microphone access error:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(recordingIntervalRef.current);
  };

  const startRecordingTimer = () => {
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const extractTextAfterMessages = (url) => {
    const regex = /_messages\.(.*)/;
    const match = url.match(regex);
    return match ? match[1] : fileName;
  };

  return (
    <div className="chat-container">
      <div className="chat-head">
        <div
          className="user"
          onClick={() => navigate(`/ads/${chat?.owner_id}`)}
        >
          <img
            src={
              chat?.user
                ? user?.id === chat?.user?.id
                  ? chat?.owner?.image
                  : chat?.user?.image || "/images/avatar.jpg"
                : "/images/deleted-account.jpg"
            }
            alt="user"
          />
          <h6 className="name">
            {chat?.user
              ? user?.id === chat?.user?.id
                ? chat?.owner?.name
                : chat?.user?.name
              : t("chat.deletedAccount")}
          </h6>
        </div>
      </div>

      {chat?.ad && (
        <Link to={`/for-rent/${chat?.ad?.id}`} className="adItem">
          <img src={chat?.ad?.image || "/images/bann.webp"} alt="" />
          <p>{chat?.ad?.title}</p>
        </Link>
      )}

      <div className="inner-container" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            className={`message ${
              message?.from_id === user?.id
                ? "sent-message"
                : "received-message"
            }`}
            key={message?.id}
          >
            <div className="d-flex flex-column">
              <div className="message-content">
                {message?.type === "text" && <p>{message?.message}</p>}
                {message?.type === "audio" && (
                  <audio controls src={message?.message} />
                )}
                {message?.type === "image" && (
                  <img
                    style={{
                      aspectRatio: 1 / 1,
                      width: "300px",
                      objectFit: "contain",
                    }}
                    src={message?.message}
                    alt=""
                  />
                )}
                {message?.type === "file" && (
                  <Link to={message?.message} target="_blank">
                    <div className="doc_message">
                      <p>{extractTextAfterMessages(message?.message)}</p>
                      <div className="icon">
                        <i className="fa-regular fa-file"></i>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <span
                dir="ltr"
                className={message?.from_id === user?.id ? "sen" : "rec"}
              >
                {formatMessageTime(message?.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-send">
        <form onSubmit={handleSendMessage} ref={formRef}>
          <div className="input-field">
            {message?.type === "text" || message?.type === "" ? (
              <input
                type="text"
                placeholder={t("chat.writeHere")}
                value={message?.type === "text" ? message?.message : ""}
                onChange={(e) =>
                  setMessage({
                    ...message,
                    message: e.target.value,
                    type: "text",
                  })
                }
              />
            ) : (
              <div className="file_place">
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-solid fa-xmark"
                  onClick={() => {
                    setMessage({ ...message, message: "", type: "" });
                    setRecordingTime(0);
                  }}
                />
                {message.type === "audio" ? (
                  <audio controls src={URL.createObjectURL(message?.message)} />
                ) : (
                  <p className="m-0">
                    {message?.message?.name || message?.message}
                  </p>
                )}
              </div>
            )}

            <label className="files-input">
              <i className="fa-regular fa-paperclip"></i>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFileName(file.name);
                  setMessage({
                    ...message,
                    message: file,
                    type: file.type.startsWith("image/")
                      ? "image"
                      : file.type.startsWith("audio/")
                      ? "audio"
                      : "file",
                  });
                }}
                type="file"
              />
            </label>

            {isRecording ? (
              <label className="files-input" onClick={stopRecording}>
                <i className="fa-solid fa-microphone-slash"></i>
              </label>
            ) : (
              <label className="files-input" onClick={startRecording}>
                <i className="fa-solid fa-microphone"></i>
              </label>
            )}
            {recordingTime > 0 && (
              <span>{formatRecordingTime(recordingTime)}</span>
            )}
          </div>

          <button type="submit" disabled={message.type === "" || loading}>
            <i className="fa-regular fa-paper-plane-top"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
