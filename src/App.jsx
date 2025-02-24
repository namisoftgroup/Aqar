import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import useAuth from "./hooks/helper/useAuth";
import { router } from "./providers/router";
import DataLoader from "./ui/DataLoader";
import i18n from "./utils/i18n";

function App() {
  const { lang } = useSelector((state) => state.language);
  const { loading } = useAuth();
  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return loading ? (
    <DataLoader />
  ) : (
    <>
      <Toaster
        toastOptions={{
          style: {
            padding: "1rem",
          },
        }}
        position="bottom-center"
        richColors
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
