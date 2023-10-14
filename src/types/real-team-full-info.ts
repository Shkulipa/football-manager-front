import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { ILeague } from './league';
import { IRealPlayer } from './real-player';
import { ISkillsAttrs } from './skills.types';

export type TSquadRealTeam = Record<EPlayerPositionName, IRealPlayer>;

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
	> {}

export interface IRealTeamFullInfo {
	_id: string;
	league: ILeague;
	clubName: string;
	logoClub: string;
	skills: ISkillsAttrs;
	main: TSquadRealTeam;
	bench: IRealPlayerNotMain[];
}
