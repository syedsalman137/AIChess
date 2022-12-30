import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		level: 1,
		isPlaying: false
	},
	reducers: {
		setLevel: (state, action) => {
			state.level = action.payload;
		},
		setPlay: (state) => {
			state.isPlaying = true;
		}
	}
})

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;