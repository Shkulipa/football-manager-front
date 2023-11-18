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
import { setLoading } from '../../BaseLayout/store/base-layout.slice';

export interface IAuthUser {
	user: ISignInRes | null;
}

const initialState: IAuthUser = {
	user: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IAuthUser['user']>) {
			state.user = action.payload;
		},
		resetUser: () => initialState
	}
});

export const { setUser, resetUser } = userSlice.actions;

export const logout =
	() => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			await apiAuth.logout();
			localStorage.removeItem(EKeyLocalStorage.USER);
			dispatch(setLoading(true));
			dispatch(setUser(null));
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			dispatch(resetUser());
			dispatch(setLoading(false));
		}
	};

export const refreshToken =
	() => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			dispatch(setLoading(true));
			const { data } = await apiAuth.refreshToken();
			const userJSON = JSON.stringify(data);
			localStorage.setItem(EKeyLocalStorage.USER, userJSON);
			dispatch(setUser(data));
		} catch (e) {
			handleActionErrors({ e, dispatch });
			localStorage.removeItem(EKeyLocalStorage.USER);
			dispatch(resetUser());
		} finally {
			dispatch(setLoading(false));
		}
	};
