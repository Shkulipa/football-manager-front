import { ISetters } from '../hook.interfaces';

export interface IUseFirstInitProps
	extends Pick<
		ISetters,
		'setTeamCountry' | 'setLeaguesLength' | 'setTeamLeague' | 'setTeam'
	> {}
