import { Dispatch, SetStateAction } from 'react';
import { ICountry, ILeague, ITeam } from 'src/interfaces';

export interface ISetters {
	setTeamCountry: Dispatch<SetStateAction<ICountry | undefined>>;
	setTeamLeague: Dispatch<SetStateAction<ILeague | undefined>>;
	handlerTeam: (team: ITeam) => void;
	setTeamsFromCurrentLeague: Dispatch<SetStateAction<ITeam[]>>;
	setLeaguesLength: Dispatch<SetStateAction<number | undefined>>;
}
