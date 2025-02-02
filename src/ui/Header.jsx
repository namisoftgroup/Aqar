import HeaderSettings from "./Header/HeaderSettings";
import Logo from "./Header/Logo";
import Navbar from "./Header/Navbar";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <Navbar />
      <HeaderSettings />
    </header>
  );
}
