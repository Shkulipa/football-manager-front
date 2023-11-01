import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
	step: null | 'success' | 'expired' | 'error' | 'loading';
	error: string;
}

const initialState: IInitialState = {
	step: null,
	error: ''
};

export const confirmEmailSlice = createSlice({
	name: 'confirm-email',
	initialState,
	reducers: {
		setStep(state, action: PayloadAction<IInitialState['step']>) {
			state.step = action.payload;
		},
		setError(state, action: PayloadAction<IInitialState['error']>) {
			state.error = action.payload;
		},
		reset: () => initialState
	}
});
export const { reset, setError, setStep } = confirmEmailSlice.actions;
