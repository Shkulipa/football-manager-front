import { ITeam } from '@/api/rest/teams/types/teams.types';

interface IInitCardData {
	initCountry?: number;
	initLeague?: number;
	initTeam?: number;
}

export interface ICardProps {
	teams: ITeam[];
	onChangeTeam: (team: any) => void;
	initData?: IInitCardData | null;
}
