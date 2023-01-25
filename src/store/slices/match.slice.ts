import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IPitchSize {
	pitchWidth: number;
	pitchHeight: number;
	goalWidth: number;
}

export enum EPlayFor {
	HOSTS = 'HOSTS',
	GUESTS = 'GUESTS'
}
interface IInitialState {
	hosts: any | null;
	guests: any | null;
	playFor: EPlayFor | null;
	pitchSize: IPitchSize;
	matchDetailsStore: any;
}

const initialState: IInitialState = {
	hosts: null,
	guests: null,
	playFor: null,

	pitchSize: {
		pitchWidth: 680,
		pitchHeight: 1050,
		goalWidth: 90
	},

	matchDetailsStore: null
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
		setPlayFor(state, action: PayloadAction<EPlayFor | null>) {
			state.playFor = action.payload;
		},
		setPitchSize(state, action: PayloadAction<IPitchSize>) {
			state.pitchSize = action.payload;
		},
		setMatchDetailsStore(state, action: PayloadAction<any>) {
			state.matchDetailsStore = action.payload;
		}
	}
});
