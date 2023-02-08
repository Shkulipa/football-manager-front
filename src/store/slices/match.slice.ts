import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IPitchSize {
	pitchWidth: number;
	pitchHeight: number;
	goalWidth: number;
}

export enum EUserFor {
	HOSTS = 'HOSTS',
	GUESTS = 'GUESTS'
}
interface IInitialState {
	hosts: any | null;
	guests: any | null;
	userFor: EUserFor | null;
	pitchSize: IPitchSize;
	matchDetails: any | null;
}

const initialState: IInitialState = {
	hosts: null,
	guests: null,
	userFor: null,

	pitchSize: {
		pitchWidth: 680,
		pitchHeight: 1050,
		goalWidth: 90
	},

	matchDetails: null
};

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		setHosts(state, action: PayloadAction<any>) {
			state.hosts = action.payload;
		},
		setGuests(state, action: PayloadAction<any>) {
			state.guests = action.payload;
		},
		setUserFor(state, action: PayloadAction<EUserFor | null>) {
			state.userFor = action.payload;
		},
		setPitchSize(state, action: PayloadAction<IPitchSize>) {
			state.pitchSize = action.payload;
		},
		setMatchDetails(state, action: PayloadAction<any | null>) {
			state.matchDetails = action.payload;
		}
	}
});
