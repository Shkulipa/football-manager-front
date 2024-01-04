import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

export interface IGetRealTeamsRes {
	items: IRealTeamFullInfo[];
	count: number;
}
