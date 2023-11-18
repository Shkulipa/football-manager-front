import { apiAuth } from '@/api/rest/auth/apiAuth';
import { ISignUpReq } from '@/api/rest/auth/types/sing-up-req';
import { IFormPropsAsync } from '@/types/others/formik';
import { handleActionErrors } from '@/utils/handle-action-errors';
import {
	AnyAction,
	PayloadAction,
	ThunkDispatch,
	createSlice
} from '@reduxjs/toolkit';

interface IInitialState {
	step: null | 'success' | 'confirmed';
	username: string;
	error: string;
}

const initialState: IInitialState = {
	step: null,
	username: '',
	error: ''
};

export const signUpSlice = createSlice({
	name: 'sign-up',
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
export const { reset, setStep, setUsername, setError } = signUpSlice.actions;

// send sign-up form
export const signUpAsync =
	({ values, formik }: IFormPropsAsync<ISignUpReq>) =>
	async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			await apiAuth.signUp(values);
			dispatch(setUsername(values.username));
			dispatch(setStep('success'));
		} catch (e) {
			handleActionErrors({ e, dispatch, formik });
		} finally {
			formik?.setSubmitting(false);
		}
	};
