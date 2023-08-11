import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./authService";

type AuthState = {
  user: User | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null } as AuthState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice;
