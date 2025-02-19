import { Outlet, useLocation } from "react-router";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useEffect } from "react";
import Aos from "aos";

export default function RootLayout() {
  let location = useLocation();

  useEffect(() => {
    setTimeout(() => Aos.refresh(), 100);
    window.scrollTo(0, 0);

    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
