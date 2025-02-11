import { useTranslation } from "react-i18next";
import ChatRoom from "../ui/Chats/ChatRoom";

const Chats = [
  {
    id: 1,
    name: "Mohamed",
    location: "Naser City - 2024",
    date: "10/28/24",
    message: "مرحبا",
    img: "/images/avatar.png",
  },
  {
    id: 2,
    name: "Saad",
    location: "Airbnb - 2024",
    date: "10/28/24",
    message: "أهلاً",
    img: "/images/avatar.png",
  },
  {
    id: 3,
    name: "Hade",
    location: "Madinet Al-Amal - 2024",
    date: "10/28/24",
    message: "290",
    img: "/images/avatar.png",
  },
  {
    id: 4,
    name: "Shehab",
    location: "Al Manteqah al Sadessa - 2024",
    date: "10/28/24",
    message: "كيف حالك؟",
    img: "/images/avatar.png",
  },
  {
    id: 5,
    name: "Ahmed",
    location: "شارع النيل - 2024",
    date: "10/28/24",
    message: "مرحبا",
    img: "/images/avatar.png",
  },
];
export default function Chat() {
  const { t } = useTranslation();
  return (
    <section className="chat-container">
      <div className="container">
        <div className="chat-wrapper">
          <div className="row">
            <div className="col-md-4 p-0">
              <h5 className="messages-title">الرسائل</h5>
              <div className="messages-list scrollbar-styles">
                <ul>
                  {Chats.map((msg) => (
                    <li key={msg.id} className="message-item">
                      <div className="message-content">
                        <div className="message-data">
                          <img
                            src={msg.img}
                            alt={msg.name}
                            className="user-img"
                          />
                          <div>
                            <div className="message-name">{msg.name}</div>
                            <div className="message-text">{msg.message}</div>
                          </div>
                        </div>
                        <div className="message-date">{msg.date}</div>
                      </div>
                      <div className="message-property-data">
                        <p className="">
                          بيت للبيع في حي طويق, مدينة الخرج, منطقة الرياض{" "}
                        </p>
                        <img className="" src="/images/house-1.jpg" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-8 pe-0">
              <ChatRoom />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
