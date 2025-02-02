import LanguageDropDown from "./languageDropdown";
import UserDropDown from "./UserDropDown";

export default function HeaderSettings() {
  return (
    <section className="header-settings">
      <LanguageDropDown />
      <UserDropDown />
    </section>
  );
}
