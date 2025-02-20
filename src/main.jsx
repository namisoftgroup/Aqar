import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import InterceptorProvider from "./providers/InterceptorProvider.jsx";
import "./utils/i18n.js";

// Font Awesome styles
import "./assets/styles/all.min.css";

// bootstrap Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "swiper/css";
// Custom styles
import "./assets/styles/main.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <InterceptorProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </InterceptorProvider>
    </QueryClientProvider>
  </StrictMode>
);
