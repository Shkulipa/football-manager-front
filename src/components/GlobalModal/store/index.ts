import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServerError } from '@/api/rest/types/server-error';

interface IInitialErrorState {
	globalError: IServerError | null;
	networkError: boolean;
}

const initialState: IInitialErrorState = {
	globalError: null,
	networkError: false
};

export const errorSlice = createSlice({
	name: 'error-slice',
	initialState,
	reducers: {
		showGlobalError(
			state,
			action: PayloadAction<IInitialErrorState['globalError']>
		) {
			state.globalError = action.payload;
		},
		resetGlobalError(state) {
			state.globalError = initialState.globalError;
		},
		setNetworkError(
			state,
			action: PayloadAction<IInitialErrorState['networkError']>
		) {
			state.networkError = action.payload;
		}
	}
});

export const { showGlobalError, resetGlobalError, setNetworkError } =
	errorSlice.actions;
