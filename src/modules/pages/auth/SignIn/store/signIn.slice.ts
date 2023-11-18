import { apiAuth } from '@/api/rest/auth/apiAuth';
import { ISignInReq } from '@/api/rest/auth/types/sign-in-req';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';
import { EServerStatus } from '@/constants/server-status.enum';
import { setUser } from '@/layouts/AuthLayout/store/user';
import { IFormPropsAsync } from '@/types/others/formik';
import { handleActionErrors } from '@/utils/handle-action-errors';
import {
	AnyAction,
	PayloadAction,
	ThunkDispatch,
	createSlice
} from '@reduxjs/toolkit';

interface IInitialState {
	step: null | 'not-activate' | 'confirmed';
	username: string;
	error: string;
}

const initialState: IInitialState = {
	step: null,
	username: '',
	error: ''
};

export const signInSlice = createSlice({
	name: 'sing-in',
	initialState,
	reducers: {
		setStep(state, action: PayloadAction<IInitialState['step']>) {
			state.step = action.payload;
		},
		setUsername(state, action: PayloadAction<IInitialState['username']>) {
			state.username = action.payload;
		},
		setError(state, action: PayloadAction<IInitialState['error']>) {
			state.error = action.payload;
		},
		reset: () => initialState
	}
});
export const { setUsername, setStep, setError, reset } = signInSlice.actions;

// send sign-in form
export const signInAsync =
	({ values, formik }: IFormPropsAsync<ISignInReq>) =>
	async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			const { data } = await apiAuth.login(values);
			const userJSON = JSON.stringify(data);
			localStorage.setItem(EKeyLocalStorage.USER, userJSON);
			dispatch(setUser(data));
		} catch (e) {
			handleActionErrors({
				e,
				dispatch,
				formik,
				additionalConditions(status) {
					/**
					 * @info
					 * when account was't activated yet
					 */
					if (status === EServerStatus.FORBIDDEN) {
						dispatch(setStep('not-activate'));
						dispatch(setUsername(values.username));
						return true;
					}
				}
			});
		} finally {
			formik?.setSubmitting(false);
		}
	};
