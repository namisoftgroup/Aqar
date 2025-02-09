import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/Home";
import Contact from "../routes/Contact";
import About from "../routes/About";
import ForRent from "../routes/ForRent";
import ForRentDetails from "../routes/ForRentDetails";
import BookingRequest from "../routes/BookingRequest";
import Orders from "../routes/Bookings";
import Bookings from "../routes/Bookings";
import BookingsDetails from "../routes/BookingsDetails";

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
        path: "bookings",
        children: [
          {
            index: true,
            element: <Bookings />,
          },
          {
            path: ":id",
            element: <BookingsDetails />,
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
      {
        path: "/booking",
        element: <BookingRequest />,
      },
    ],
  },
]);
