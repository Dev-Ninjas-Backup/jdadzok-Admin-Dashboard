// src/redux/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: null,
		user: null,
	},
	reducers: {
		setCredentials: (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			localStorage.setItem("token", action.payload.token); // optional
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem("token"); // optional
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
