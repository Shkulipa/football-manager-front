import { Dispatch, SetStateAction } from 'react';
import { ICountry, ILeague, ITeam } from 'src/interfaces';

export interface ISetters {
	setTeamCountry: Dispatch<SetStateAction<ICountry | undefined>>;
	setTeamLeague: Dispatch<SetStateAction<ILeague | undefined>>;
	setTeam: Dispatch<SetStateAction<ITeam | undefined>>;
	setTeamsFromCurrentLeague: Dispatch<SetStateAction<ITeam[]>>;
	setLeaguesLength: Dispatch<SetStateAction<number | undefined>>;
}
