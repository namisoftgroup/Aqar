import { useState, useRef } from "react";

import { Button } from "react-bootstrap";
import InputField from "../ui/form/InputField";

const initialMessages = [
  { sender: "Mohamed", text: "صباح الخير", time: "6:59" },
  { sender: "Me", text: "هل متاح الآن؟", time: "1:42" },
  { sender: "Mohamed", text: "الغرفة متاحة من 17 الى 22", time: "7:00" },
];
const Chats = [
  {
    id: 1,
    name: "Mohamed",
    location: "Naser City - 2024",
    date: "10/28/24",
    message: "مرحبا",
    img: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Saad",
    location: "Airbnb - 2024",
    date: "10/28/24",
    message: "أهلاً",
    img: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Hade",
    location: "Madinet Al-Amal - 2024",
    date: "10/28/24",
    message: "290",
    img: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Shehab",
    location: "Al Manteqah al Sadessa - 2024",
    date: "10/28/24",
    message: "كيف حالك؟",
    img: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    name: "Ahmed",
    location: "شارع النيل - 2024",
    date: "10/28/24",
    message: "مرحبا",
    img: "https://via.placeholder.com/40",
  },
];
export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: "Me",
      text: input,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.current.ondataavailable = (event) =>
        chunks.push(event.data);
      mediaRecorder.current.onstop = () =>
        setAudioBlob(new Blob(chunks, { type: "audio/wav" }));

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone access denied", error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  const sendAudio = () => {
    if (!audioBlob) return;
    const audioURL = URL.createObjectURL(audioBlob);
    const newMessage = {
      sender: "Me",
      text: "🔊 Voice Message",
      audio: audioURL,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages([...messages, newMessage]);
    setAudioBlob(null);
  };

  return (
    <section className="chat-container">
      <div className="row">
        <div className="col-md-4">
          <div className="messages-list">
            {" "}
            <h5 className="messages-title">الرسائل</h5>
            <ul>
              {Chats.map((msg) => (
                <li key={msg.id} className="message-item">
                  <div className="message-content">
                    <img src={msg.img} alt={msg.name} className="user-img" />
                    <div>
                      <div className="message-name">{msg.name}</div>
                      <div className="message-text">{msg.message}</div>
                    </div>
                  </div>
                  <div className="message-date">{msg.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-user">
                <span className="user-initial">M</span>
                <div>
                  <div className="chat-user-name">Mohamed</div>
                  <div className="chat-location">The Magical... 2024</div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.sender === "Me" ? "me" : ""}`}
              >
                {msg.audio ? (
                  <audio controls src={msg.audio} />
                ) : (
                  <span className="chat-text">{msg.text}</span>
                )}
                <span className="chat-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <InputField
              type="text"
              placeholder="اكتب رسالة..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <i className="fa-sharp fa-light fa-paper-plane"></i>
            </button>
            <button onClick={recording ? stopRecording : startRecording}>
              <i className="fa-light fa-microphone"></i>
            </button>
            {audioBlob && (
              <div className="audio-preview">
                <audio controls src={URL.createObjectURL(audioBlob)} />
                <Button variant="success" onClick={sendAudio}>
                  إرسال
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
