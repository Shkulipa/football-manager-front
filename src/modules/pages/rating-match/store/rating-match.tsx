import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMatchDetails, ITeam } from 'footballsimulationengine';

interface IInitialState {
	initUserTeam: ITeam | null;
	secondUserTeamVersion: ITeam | null;
	matchDetails: IMatchDetails | null;
	cooldownUpdateSquad: number | null;
}

const initialState: IInitialState = {
	initUserTeam: null,
	secondUserTeamVersion: null,
	matchDetails: null,
	cooldownUpdateSquad: null
};

export const ratingMatchSlice = createSlice({
	name: 'rating-match',
	initialState,
	reducers: {
		setInitUserTeam(state, action: PayloadAction<ITeam | null>) {
			state.initUserTeam = action.payload;
		},
		setSecondUserTeamVersion(state, action: PayloadAction<ITeam | null>) {
			state.secondUserTeamVersion = action.payload;
		},
		setMatchDetails(state, action: PayloadAction<IMatchDetails | null>) {
			state.matchDetails = action.payload;
		},
		setCooldownUpdateSquad(state, action: PayloadAction<number | null>) {
			state.cooldownUpdateSquad = action.payload;
		},
		reset: () => initialState
	}
});
