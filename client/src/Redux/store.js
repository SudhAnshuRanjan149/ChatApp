import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './Slice/LoginSlice.js';
import ChatSlice from './Slice/ChatSlice.js';

export default configureStore({
	reducer: {
		LoginSlice,
		ChatSlice
	},
});
