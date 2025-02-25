import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export default function Owner({ ad }) {
  console.log(ad);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleCreateRoom = () => {
    sessionStorage.setItem("ad_id", ad?.id);
    sessionStorage.setItem("user_id", user?.id);
    sessionStorage.setItem("owner_id", ad?.user.id);
    sessionStorage.setItem("orderBy", "asc");
    navigate(`/chat`);
  };
  return (
    <div className="user">
      <h4>{t("forRent.userInfo")}</h4>
      <div className="d-flex justify-content-between align-items-center">
        <div className="info">
          <img className="user-img" src={ad.user.image} alt="User" />
          <h5>{ad.user.name}</h5>
        </div>
        <button onClick={handleCreateRoom}>
          <i className="fa-light fa-comment"></i> {t("forRent.chat")}
        </button>
      </div>
    </div>
  );
}
