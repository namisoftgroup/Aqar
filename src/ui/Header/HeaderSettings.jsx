import { Link } from "react-router";
import LanguageDropDown from "./languageDropdown";
import UserDropDown from "./UserDropDown";
import useAuth from "../../hooks/helper/useAuth";

export default function HeaderSettings() {
  const { isAuthed } = useAuth();
  return (
    <section className="header-settings">
      {isAuthed && (
        <Link to="/notifications" className="rounded-btn d-none d-sm-flex">
          <i className="fa-light fa-bell"></i>
        </Link>
      )}
      <LanguageDropDown />
      <UserDropDown />
    </section>
  );
}
