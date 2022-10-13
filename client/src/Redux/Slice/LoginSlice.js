import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { loginData:{socket:"", username:"", room:""} };

const LoginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    SaveLoginData(state, action) {
	state.loginData = action.payload;
    }
  }
})

export const { SaveLoginData } = LoginSlice.actions;
export default LoginSlice.reducer;