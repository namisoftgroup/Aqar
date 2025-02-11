import { Link } from "react-router";
import LanguageDropDown from "./languageDropdown";
import UserDropDown from "./UserDropDown";

export default function HeaderSettings() {
  return (
    <section className="header-settings">
      <Link to="/notifications" className="rounded-btn">
        <i className="fa-light fa-bell"></i>
      </Link>
      <LanguageDropDown />
      <UserDropDown />
    </section>
  );
}
