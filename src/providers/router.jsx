import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../layout/RootLayout";
import About from "../routes/About";
import BookingRequest from "../routes/BookingRequest";
import Bookings from "../routes/Bookings";
import BookingsDetails from "../routes/BookingsDetails";
import Contact from "../routes/Contact";
import EditProfile from "../routes/EditProfile";
import Favourites from "../routes/Favourites";
import ForRent from "../routes/ForRent";
import ForRentDetails from "../routes/ForRentDetails";
import Home from "../routes/Home";
import Wallet from "../routes/Wallet";
import Notifications from "../routes/Notifications";
import Chat from "../routes/Chats";
import ProtectionProvider from "./ProtectionProvider";
import { Suspense } from "react";
import Ads from "../routes/Ads";

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
      {
        path: "/booking",
        element: <BookingRequest />,
      },
      {
        path: "",
        element: (
          <ProtectionProvider>
            <Suspense fallback={<div>Loading..........</div>}>
              <Outlet />
            </Suspense>
          </ProtectionProvider>
        ),
        children: [
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
            path: "add-property",
            element: <Ads />,
          },
          {
            path: "favourites",
            element: <Favourites />,
          },
          {
            path: "wallet",
            element: <Wallet />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);
