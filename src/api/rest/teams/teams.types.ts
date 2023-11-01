import { ILeague } from '@/types/primary/league';
import { IRealTeamShortInfo } from '@/types/primary/real-team-short-info';
import { ICountry } from 'footballsimulationengine';

interface ILeagueItem extends Omit<ILeague, 'country'> {
	teams: IRealTeamShortInfo[];
}

export interface ITeam extends ICountry {
	leagues: ILeagueItem[];
}
