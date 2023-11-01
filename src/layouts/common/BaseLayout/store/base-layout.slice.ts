import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
	isLoading: boolean;
	error: string;
}

const initialState: IInitialState = {
	isLoading: false,
	error: ''
};

export const baseLayoutSlice = createSlice({
	name: 'base-layout',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<IInitialState['isLoading']>) {
			state.isLoading = action.payload;
		},
		setError(state, action: PayloadAction<IInitialState['error']>) {
			state.error = action.payload;
		},
		reset: () => initialState
	}
});
export const { reset, setError, setLoading } = baseLayoutSlice.actions;
