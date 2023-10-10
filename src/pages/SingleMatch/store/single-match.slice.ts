import { EMatchSide } from '@/constants/match-sides.enum';
import { IMatchDetails } from '@/types/football-simulator-engine/match-details.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
	hosts: any | null;
	guests: any | null;
	userFor: EMatchSide | null;
	matchDetails: IMatchDetails | null;
}

const initialState: IInitialState = {
	hosts: null,
	guests: null,
	userFor: null,
	matchDetails: null
};

export const singleMatchSlice = createSlice({
	name: 'single-match',
	initialState,
	reducers: {
		setHosts(state, action: PayloadAction<any>) {
			state.hosts = action.payload;
		},
		setGuests(state, action: PayloadAction<any>) {
			state.guests = action.payload;
		},
		setUserFor(state, action: PayloadAction<EMatchSide | null>) {
			state.userFor = action.payload;
		},
		setMatchDetails(state, action: PayloadAction<IMatchDetails | null>) {
			state.matchDetails = action.payload;
		},
		reset(state) {
			state.hosts = null;
			state.guests = null;
			state.userFor = null;
			state.matchDetails = null;
		}
	}
});
