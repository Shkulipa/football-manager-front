import { ILeague } from './league';
import { IRealPlayer } from './real-player';
import { ISkillsAttrs } from './skills.types';
import { TSquadMain } from './user-team';

export interface IRealPlayerNotMain
	extends Pick<
		IRealPlayer,
		| '_id'
		| 'skills'
		| 'rating'
		| 'positions'
		| 'number'
		| 'name'
		| 'country'
		| 'age'
		| 'photo'
	> {}

export interface IRealTeamFullInfo {
	_id: string;
	league: ILeague;
	clubName: string;
	logoClub: string;
	skills: ISkillsAttrs;
	main: TSquadMain;
	bench: IRealPlayerNotMain[];
}
