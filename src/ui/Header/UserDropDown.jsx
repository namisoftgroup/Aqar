import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { openAuthModal } from "../../redux/slices/authModalSlice";
import AuthModal from "../Authentication/AuthModal";

export default function UserDropDown() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="user-btn">
          <img src="/icons/user.svg" alt="user_alt" />
          {t("header.myAccount")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(openAuthModal())}>
            {t("header.login")}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(openAuthModal())}>
            {t("header.register")}
          </Dropdown.Item>
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
