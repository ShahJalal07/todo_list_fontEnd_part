import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
  },
  reducers: {
    setProfileDetails: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfileDetails } = todosSlice.actions;

export default todosSlice.reducer;
