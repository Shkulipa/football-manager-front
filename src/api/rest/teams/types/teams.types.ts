import { ILeague } from '@/types/football-simulator/league';
import { IRealTeamShortInfo } from '@/types/football-simulator/real-team-short-info';
import { ICountry } from 'footballsimulationengine';

interface ILeagueItem extends Omit<ILeague, 'country'> {
	teams: IRealTeamShortInfo[];
}

export interface ITeam extends ICountry {
	leagues: ILeagueItem[];
}
