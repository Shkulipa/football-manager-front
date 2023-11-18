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
import { singleMatchSlice } from '@/modules/pages/single-match/store/single-match.slice';
import { errorSlice } from '@/components/GlobalModal/store';
import { signUpSlice } from '@/modules/pages/auth/SignUp/store/sign-up.slice';
import { userSlice } from '@/layouts/AuthLayout/store/user';
import { confirmEmailSlice } from '@/modules/pages/activation/ConfirmEmail/store/confirm-email.slice';
import { signInSlice } from '@/modules/pages/auth/SignIn/store/signIn.slice';
import { userTeamSlice } from '@/modules/pages/user-team/store/userTeam.slice';
import { baseLayoutSlice } from '@/layouts/BaseLayout/store/base-layout.slice';
import { ratingMatchSlice } from '@/modules/pages/rating-match/store/rating-match';

const rootPersistConfig = {
	key: 'root',
	storage: storageSession
};

const rootReducer = combineReducers({
	errorReducer: errorSlice.reducer,
	userReducer: userSlice.reducer,
	signInReducer: signInSlice.reducer,
	signUpReducer: signUpSlice.reducer,
	baseLayoutReducer: baseLayoutSlice.reducer,
	confirmEmailReducer: confirmEmailSlice.reducer,
	singleMatchReducer: singleMatchSlice.reducer,
	userTeamReducer: userTeamSlice.reducer,
	ratingMatchReducer: ratingMatchSlice.reducer
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

export type TStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
