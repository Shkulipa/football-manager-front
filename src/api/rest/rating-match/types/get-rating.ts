import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

export interface ITeam
	extends Pick<IRealTeamFullInfo, '_id' | 'clubName' | 'logoClub'> {
	ratingElo: number;
	rank: number;
}

export interface IRating {
	items: ITeam[];
	count: number;
}

export interface IGetRatingRes {
	rating: IRating;
	userTeam: ITeam;
}
