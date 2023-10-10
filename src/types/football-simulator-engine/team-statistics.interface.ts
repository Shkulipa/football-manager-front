export interface ITeamStatistics {
	goals: number;
	shots: IShots;
	corners: number;
	freekicks: number;
	penalties: number;
	fouls: number;
}

export interface IShots {
	total: number;
	on: number;
	off: number;
}
