import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function ChatRoom({ chat }) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    // from_id: user?.id,
    // chat_id: chat?.id,
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
  //   const { user } = useSelector((state) => state.authedUser);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (chat) {
      setMessages(chat?.messages.slice() || []);
    }
  }, [chat]);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Clear recording interval on component unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (message?.type === "") {
      return;
    }

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          ...message,
          message:
            message.type !== "text"
              ? URL.createObjectURL(message.message)
              : message.message,
          id: Date.now(),
          created_at: Date.now(),
        },
      ];
    });
    console.log(messages);

    formRef.current.reset();
    setMessage({
      //   from_id: user?.id,
      chat_id: chat?.id,
      message: "",
      type: "",
    });

    try {
      //   await createMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setRecordingTime(0);
      setLoading(false);
    }
  };

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

  // Format recording time
  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Extract file name from URL
  const extractTextAfterMessages = (url) => {
    const regex = /_messages\.(.*)/;
    const match = url.match(regex);
    return match ? match[1] : fileName;
  };
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const timeStr = `${hours}:${minutesStr} ${ampm}`;
    return timeStr;
  };

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-user">
            <span className="user-initial">M</span>
            <div>
              <div className="chat-user-name">Mohamed</div>
              <div className="chat-location">
                بيت للبيع في حي طويق, مدينة الخرج, منطقة الرياض
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-body scrollbar-styles" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === "Me" ? "me" : ""}`}
          >
            {message.type === "text" && (
              <span className="chat-text">{message.message}</span>
            )}{" "}
            {message.type === "audio" && (
              <audio controls src={message.message} />
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
            )}{" "}
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
            <span className="chat-time">
              {" "}
              {formatMessageTime(message?.created_at)}
            </span>
          </div>
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
            {isRecording ? (
              <label className="files-input" onClick={stopRecording}>
                <i className="fa-solid fa-microphone-slash"></i>
                <input type="" />
              </label>
            ) : (
              <label className="files-input" onClick={startRecording}>
                <i className="fa-solid fa-microphone"></i>
                <input type="" />
              </label>
            )}
            {recordingTime > 0 && (
              <span>{formatRecordingTime(recordingTime)}</span>
            )}
          </div>

          <button type="submit" disabled={message.type === "" && loading}>
            <i className="fa-regular fa-paper-plane-top"></i>
          </button>
        </form>
      </div>
    </>
  );
}
