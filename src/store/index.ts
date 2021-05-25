import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication";
import assessmentReducer from "./slices/assessment";

const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		assessment: assessmentReducer
	},
});

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch