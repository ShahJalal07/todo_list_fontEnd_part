import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
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

export const { setProfileDetails } = profileSlice.actions;

export default profileSlice.reducer;
