import { EPlayerPositionName, ICountry } from 'footballsimulationengine';
import { IPlayerSkills } from './player-skills';

export interface IRealPlayer {
	_id: string;
	country: ICountry;
	positions: EPlayerPositionName[];
	name: string;
	photo?: string;
	number: number;
	age: number;
	skills: IPlayerSkills;
	rating: number;
}
