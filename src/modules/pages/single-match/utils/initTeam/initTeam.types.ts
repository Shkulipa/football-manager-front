import { ITeam } from '@/api/rest/teams/teams.types';
import { IRealTeamShortInfo } from '@/types/football-simulator/real-team-short-info';

export interface IUseInitTeamProps {
	teams: ITeam[];
	currTeam: IRealTeamShortInfo | null;
}
