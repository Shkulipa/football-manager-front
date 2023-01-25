import { configureStore } from '@reduxjs/toolkit';

import { matchSlice } from './slices/match.slice';

export const store = configureStore({
	reducer: {
		[matchSlice.name]: matchSlice.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat();
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
