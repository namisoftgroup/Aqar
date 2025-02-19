import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCreateMessage } from "../../hooks/chats/useCreateMessage";
import MessageBubble from "./MessageBubble";
import RecordingControls from "./RecordingControls";

export default function ChatRoom({ chat }) {
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    from_id: user?.id,
    chat_id: chat?.id,
    message: "",
    type: "",
  });
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const { t } = useTranslation();
  const [fileName, setFileName] = useState("");
  const { createMessage, isPending } = useCreateMessage();
  useEffect(() => {
    if (chat) {
      setMessages(chat?.messages.slice() || []);
    }
  }, [chat]);
  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages]);
  // Clear recording interval on component unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!message.type || (message.type === "text" && !message.message.trim()))
        return;
      const newMessage = {
        ...message,
        message:
          message.type === "text" ? message.message : message.message.name,
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, created_at: new Date() },
      ]);
      console.log(messages);

      const formData = new FormData();
      formData.append("from_id", user?.id);
      formData.append("chat_id", chat?.id);
      formData.append("type", message.type);
      formData.append("message", message.message);
      createMessage(formData, {
        onSettled: () => {
          formRef.current.reset();
          setMessage({
            from_id: user?.id,
            chat_id: chat?.id,
            message: "",
            type: "",
          });
        },
      });
      setRecordingTime(0);
    },
    [message, user?.id, chat?.id]
  );
  // Start recording
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
      mediaRecorderInstance.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setMessage((prevMessage) => ({
          ...prevMessage,
          message: audioBlob,
          type: "audio",
        }));

        mediaRecorderInstance.stream.getTracks().forEach((track) => {
          track.stop();
        });
        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
      };
      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
      startRecordingTimer();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(recordingIntervalRef.current);
  };
  // Start recording timer
  const startRecordingTimer = () => {
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-user">
            <img className="user-initial" src={chat.owner.image} />
            <div>
              <div className="chat-user-name">{chat.owner.name}</div>
              <div className="chat-location">
                {chat?.ad?.title}, {chat?.ad?.address}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-body scrollbar-styles" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} fileName={fileName} />
        ))}
      </div>
      <div className="chat-footer">
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
                disabled={isPending || isRecording}
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
                name="userImage"
                id="img-upload"
              />
            </label>
            <RecordingControls
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              recordingTime={recordingTime}
            />
          </div>
          <button type="submit" disabled={message.type === "" && isPending}>
            <i className="fa-regular fa-paper-plane-top"></i>
          </button>
        </form>
      </div>
    </>
  );
}
