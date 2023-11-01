import { EMatchSide } from '@/constants/footballsimulationengine/match-sides.enum';
import { IRealTeamShortInfo } from '@/types/primary/real-team-short-info';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMatchDetails } from 'footballsimulationengine';

interface IInitialState {
	hosts: IRealTeamShortInfo | null;
	guests: IRealTeamShortInfo | null;
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
		setHosts(state, action: PayloadAction<IRealTeamShortInfo>) {
			state.hosts = action.payload;
		},
		setGuests(state, action: PayloadAction<IRealTeamShortInfo>) {
			state.guests = action.payload;
		},
		setUserFor(state, action: PayloadAction<EMatchSide | null>) {
			state.userFor = action.payload;
		},
		setMatchDetails(state, action: PayloadAction<IMatchDetails | null>) {
			state.matchDetails = action.payload;
		},
		reset: () => initialState
	}
});
