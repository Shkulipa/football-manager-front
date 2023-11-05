import { apiUserTeam } from '@/api/rest/user-team/apiUserTeam';
import { EServerStatus } from '@/constants/server-status.enum';
import { IFormPropsAsync } from '@/types/others/formik';
import { handleActionErrors } from '@/utils/handle-action-errors';
import {
	AnyAction,
	PayloadAction,
	ThunkDispatch,
	createSlice
} from '@reduxjs/toolkit';
import { ICreateUserTeamInitialValues } from '../create-user-team/CreateUserTeam.types';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';

interface IInitialState {
	initVersionTeam: null | IGetOwnTeamRes;
	secondVersionTeam: null | IGetOwnTeamRes;
	step:
		| null
		| 'user-team'
		| 'create-user-team'
		| 'success-create'
		| 'success-deleted-team';
	isLoading: boolean;
	error: string;
}

const initialState: IInitialState = {
	initVersionTeam: null,

	/**
	 * @info
	 * we set another property for updating squad, for opportunity reset it
	 * if user will want to do it
	 */
	secondVersionTeam: null,

	step: null,
	isLoading: false,
	error: ''
};

export const userTeamSlice = createSlice({
	name: 'user-team',
	initialState,
	reducers: {
		setStep(state, action: PayloadAction<IInitialState['step']>) {
			state.step = action.payload;
		},
		setLoading(state, action: PayloadAction<IInitialState['isLoading']>) {
			state.isLoading = action.payload;
		},
		setError(state, action: PayloadAction<IInitialState['error']>) {
			state.error = action.payload;
		},
		setInitVersionTeam(
			state,
			action: PayloadAction<IInitialState['initVersionTeam']>
		) {
			state.initVersionTeam = action.payload;
		},
		setSecondVersionTeam(
			state,
			action: PayloadAction<IInitialState['secondVersionTeam']>
		) {
			state.secondVersionTeam = action.payload;
		},
		reset: () => initialState
	}
});
export const {
	reset,
	setInitVersionTeam,
	setSecondVersionTeam,
	setStep,
	setLoading,
	setError
} = userTeamSlice.actions;

// getUserTeam
export const getUserTeam =
	() => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			dispatch(setLoading(true));
			const { data } = await apiUserTeam.getOwnTeam();
			dispatch(setInitVersionTeam(data));
			dispatch(setSecondVersionTeam(data));
			dispatch(setStep('user-team'));
		} catch (e) {
			handleActionErrors({
				e,
				dispatch,
				additionalConditions(status) {
					/**
					 * @info
					 * when user team wasn't found or wasn't created yet
					 */
					if (status === EServerStatus.NOT_FOUND) {
						dispatch(setStep('create-user-team'));
						return true;
					}
				}
			});
		} finally {
			dispatch(setLoading(false));
		}
	};

// create user team
export const createUserTeamAsync =
	({ values, formik }: IFormPropsAsync<ICreateUserTeamInitialValues>) =>
	async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			const formData = new FormData();
			Object.entries(values).forEach(([key, val]) => formData.append(key, val));
			await apiUserTeam.createTeam(formData);
			dispatch(setStep('success-create'));
		} catch (e) {
			handleActionErrors({ e, dispatch, formik });
		} finally {
			formik?.setSubmitting(false);
		}
	};
