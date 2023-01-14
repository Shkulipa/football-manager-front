export interface ISkill {
	att: string;
	mid: string;
	def: string;
}

export interface ITeam {
	_id: number;
	leagueId: string;
	clubName: string;
	logoClub: string;
	skills: ISkill;
}
