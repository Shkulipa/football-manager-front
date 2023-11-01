interface IInitCardData {
	initCountry?: number;
	initLeague?: number;
	initTeam?: number;
}

export interface ICardProps {
	teams: any[];
	onChangeTeam: (team: any) => void;
	initData?: IInitCardData;
}
