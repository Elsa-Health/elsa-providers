import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
	loggedIn: boolean;
	uid: string;
	name: string;
	lat: number;
	lng: number;
};

const initialState: SliceState = {
	loggedIn: false,
	uid: "",
	name: "",
	lat: 0,
	lng: 0,
};

export const authenticationSlice = createSlice({
	name: "facility",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<SliceState>) => {
			state.loggedIn = true;
			state.uid = action.payload.uid;
			state.name = action.payload.name;
			state.lat = action.payload.lat;
			state.lng = action.payload.lng;
		},
		logout: (state) => {
			state.loggedIn = false;
			state.uid = "";
			state.name = "";
			state.lat = 0;
			state.lng = 0;
		},
	},
});

export const { logout, login } = authenticationSlice.actions;
export default authenticationSlice.reducer;
