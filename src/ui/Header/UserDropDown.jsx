import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function UserDropDown() {
  const { t } = useTranslation();

  return (
    <Dropdown>
      <Dropdown.Toggle className="user-btn">
        <img src="/icons/user.svg" alt="user_alt" />
        {t("header.myAccount")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>{t("header.login")}</Dropdown.Item>
        <Dropdown.Item>{t("header.register")}</Dropdown.Item>
        <span className="line" />
        <Dropdown.Item as={Link} to="/help">
          {t("header.help")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
