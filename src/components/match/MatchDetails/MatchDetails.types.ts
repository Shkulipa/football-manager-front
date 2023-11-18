export interface ITeamData {
	clubName: string;
	logoClub?: string;
	goals: number;
}

export interface IMatchDetailsProps {
	kickOffTeam: ITeamData;
	secondTeam: ITeamData;
}
