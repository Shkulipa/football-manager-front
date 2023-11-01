import { ITeam } from '@/api/rest/teams/teams.types';

export interface IUseInitTeamProps {
	teams: ITeam[];
	currTeam: ITeam;
}
