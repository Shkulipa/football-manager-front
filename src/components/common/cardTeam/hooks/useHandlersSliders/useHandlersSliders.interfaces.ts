import { ICountry, ILeague, ITeam } from 'src/interfaces';

import { ISetters } from '../hook.interfaces';

export interface IUseHandlersSlidersProps extends ISetters {
	teamCountry?: ICountry;
	teamLeague?: ILeague;
	team?: ITeam;
	teamsFromCurrentLeague: ITeam[];
}
