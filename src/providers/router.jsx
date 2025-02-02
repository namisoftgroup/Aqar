import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/Home";
import Contact from "../routes/Contact";
import About from "../routes/About";
import ForRent from "../routes/ForRent";
import ForRentDetails from "../routes/ForRentDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "for-rent",
        children: [
          {
            index: true,
            element: <ForRent />,
          },
          {
            path: ":id",
            element: <ForRentDetails />,
          },
        ],
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
    ],
  },
]);
