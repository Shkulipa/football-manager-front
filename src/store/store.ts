import storageSession from 'redux-persist/lib/storage/session';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { userSlice } from '@/layouts/common/user/store/user';
import { errorSlice } from '@/components/GlobalModal/store';

const rootPersistConfig = {
	key: 'root',
	storage: storageSession
};

const rootReducer = combineReducers({
	errorReducer: errorSlice.reducer,
	userReducer: userSlice.reducer,
	singleMatchReducer: singleMatchSlice.reducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		});
	}
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
