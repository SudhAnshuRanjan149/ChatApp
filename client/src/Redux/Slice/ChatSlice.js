import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

const ChatSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    SaveChatData(state, action) {
      state.data.push(action.payload);
    }
  },
});

export const { SaveChatData } = ChatSlice.actions;
export default ChatSlice.reducer;
