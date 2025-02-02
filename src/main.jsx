import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./utils/i18n.js";

// Font Awesome styles
import "./assets/styles/all.min.css";

// bootstrap Styles
import "bootstrap/dist/css/bootstrap.min.css";

// Custom styles
import "./assets/styles/main.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
