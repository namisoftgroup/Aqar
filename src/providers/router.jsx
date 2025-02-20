import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../layout/RootLayout";
import BookingRequest from "../routes/BookingRequest";
import Bookings from "../routes/Bookings";
import BookingsDetails from "../routes/BookingsDetails";
import Chat from "../routes/Chats";
import Contact from "../routes/Contact";
import EditProfile from "../routes/EditProfile";
import Favourites from "../routes/Favourites";
import ForRent from "../routes/ForRent";
import ForRentDetails from "../routes/ForRentDetails";
import Home from "../routes/Home";
import Notifications from "../routes/Notifications";
import Profile from "../routes/Profile";
import Wallet from "../routes/Wallet";
import DataLoader from "../ui/DataLoader";
import ProtectionProvider from "./ProtectionProvider";
import NotFound from "../ui/NotFound";
import ErrorPage from "../ui/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "for-rent",
        element: <ForRent />,
      },
      {
        path: "for-rent/:id",
        element: <ForRentDetails />,
      },

      {
        path: "contact-us",
        element: <Contact />,
      },

      {
        path: "",
        element: (
          <ProtectionProvider>
            <Suspense fallback={<DataLoader />}>
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
            path: "/booking/:id",
            element: <BookingRequest />,
          },
          {
            path: "favourites",
            element: <Favourites />,
          },
          {
            path: "profile",
            element: <Profile />,
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
      {
        path: "*",
        element: <NotFound />, // Replace with your custom 404 component
      },
    ],
  },
]);
