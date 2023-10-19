import { apiAuth } from '@/api/rest/auth/apiAuth';
import { ISignInRes } from '@/api/rest/auth/types/sign-in-res';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';
import { handleActionErrors } from '@/utils/handle-action-errors';
import {
	AnyAction,
	createSlice,
	PayloadAction,
	ThunkDispatch
} from '@reduxjs/toolkit';

export interface IAuthUser {
	user: ISignInRes | null;
	isFetching: boolean;
}

const initialState: IAuthUser = {
	user: null,
	isFetching: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IAuthUser['user']>) {
			state.user = action.payload;
		},
		setFetching(state, action: PayloadAction<boolean>) {
			state.isFetching = action.payload;
		},
		resetUser: () => initialState
	}
});

export const { setUser, resetUser, setFetching } = userSlice.actions;

export const logout =
	() => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			dispatch(setFetching(true));
			await apiAuth.logout();
			localStorage.removeItem(EKeyLocalStorage.USER);
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			dispatch(resetUser());
		}
	};

export const refreshToken =
	() => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			dispatch(setFetching(true));
			const { data } = await apiAuth.refreshToken();
			const userJSON = JSON.stringify(data);
			localStorage.setItem(EKeyLocalStorage.USER, userJSON);
			dispatch(setUser(data));
		} catch (e) {
			handleActionErrors({ e, dispatch });
			localStorage.removeItem(EKeyLocalStorage.USER);
			dispatch(resetUser());
		} finally {
			dispatch(setFetching(false));
		}
	};
