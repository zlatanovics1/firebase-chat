import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInput {
  displayName: string;
  email: string;
  id: string;
  moderator: boolean;
}

type UserState = UserInput & { isLogedIn: boolean };

const initialState: UserState = {
  isLogedIn: false,
  displayName: "",
  email: "",
  id: "",
  moderator: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInput>) {
      // state = { ...action.payload, isLogedIn: true };
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.moderator = action.payload.moderator;
      state.id = action.payload.id;
      state.isLogedIn = true;
    },
    clearUser(state) {
      state.displayName = "";
      state.id = "";
      state.email = "";
      state.isLogedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: { user: UserState }) => {
  return state.user;
};
