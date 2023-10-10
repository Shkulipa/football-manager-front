import { IPlayerSkills } from '../player-skills';
import { IStats } from './stats.interface';

export interface IPlayer {
	realPlayerId: string;
	name: string;
	rating: number;
	position: string;
	skill: IPlayerSkills;
	currentPOS: number[];
	fitness: number;
	injured: boolean;
	playerID: number;
	originPOS: number[];
	intentPOS: number[];
	action: string;
	offside: boolean;
	hasBall: boolean;
	stats: IStats;
	number: number;
}

export type IPlayerParse = Pick<
	IPlayer,
	| 'realPlayerId'
	| 'name'
	| 'rating'
	| 'position'
	| 'skill'
	| 'currentPOS'
	| 'fitness'
	| 'injured'
>;
