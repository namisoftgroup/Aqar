import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { openAuthModal } from "../../redux/slices/authModalSlice";
import AuthModal from "../Authentication/AuthModal";
import useAuth from "../../hooks/helper/useAuth";

import { useLogout } from "../../hooks/auth/useLogout";

export default function UserDropDown() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthed } = useAuth();
  const user = useSelector((state) => state.user.user);
  const handleLogout = useLogout();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="user-btn">
          <div className="user-img-wrapper">
            <img
              src={user?.image ? user.image : "/icons/user.svg"}
              alt="user_alt"
            />
          </div>
          {t("header.myAccount")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {isAuthed ? (
            <Dropdown.Item onClick={handleLogout}>
              {t("header.logout")}
            </Dropdown.Item>
          ) : (
            <>
              <Dropdown.Item onClick={() => dispatch(openAuthModal())}>
                {t("header.login")}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(openAuthModal())}>
                {t("header.register")}
              </Dropdown.Item>{" "}
            </>
          )}
          <span className="line" />
          <Dropdown.Item as={Link} to="/help">
            {t("header.help")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <AuthModal />
    </>
  );
}
