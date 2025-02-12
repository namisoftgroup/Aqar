import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import authModalSlice from "./slices/authModalSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    authModal: authModalSlice,
    user: userSlice,
  },
});
