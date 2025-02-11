import { useRef, useState } from "react";
import HeaderSettings from "./Header/HeaderSettings";
import Logo from "./Header/Logo";
import Navbar from "./Header/Navbar";
import SideMenu from "./SideMenu";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuToggleButton = useRef(null);
  return (
    <header className="header">
      <div className="d-flex align-items-center  gap-3">
        <button onClick={() => setOpenMenu((open) => !open)}>
          <i ref={menuToggleButton} className="fa-solid fa-bars"></i>
        </button>
        <SideMenu
          toggleRef={menuToggleButton}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        <Logo />
      </div>
      <Navbar />
      <HeaderSettings />
    </header>
  );
}
