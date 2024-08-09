import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Message } from "../../types/firestore";
export interface ChatState {
  messages: Message[];
}
const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessages(state, action: PayloadAction<Message[]>) {
      state.messages = [...state.messages, ...action.payload];
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});
export default chatSlice.reducer;
export const { addMessages, clearMessages } = chatSlice.actions;

export const getMessages = (state: { chat: ChatState }) => {
  return state.chat.messages;
};
