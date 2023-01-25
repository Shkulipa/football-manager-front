import { Dispatch, SetStateAction } from 'react';
import { ITeam } from 'src/interfaces';

import { ISetters } from '../hook.interfaces';

export interface IUseFirstInitProps
	extends Pick<
		ISetters,
		'setTeamCountry' | 'setLeaguesLength' | 'setTeamLeague' | 'handlerTeam'
	> {
	setTeamsFromCurrentLeague: Dispatch<SetStateAction<ITeam[]>>;
}
