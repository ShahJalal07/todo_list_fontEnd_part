import profileSlice from "../slices/profileSlice";
import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../slices/todolistSlice";




export const store = configureStore({
  reducer: {
    profile: profileSlice,
    todos: todosSlice,
  },
});
