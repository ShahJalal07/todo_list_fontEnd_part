import profileSlice from "../slices/profileSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    profile: profileSlice

  },
});
