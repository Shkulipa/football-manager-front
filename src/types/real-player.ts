import { EPlayerPositionName } from 'footballsimulationengine';
import { ICountry } from './country';
import { IPlayerSkills } from './player-skills';
import { IRealTeamShortInfo } from './real-team-short-info';

export interface IRealPlayer {
	_id: string;
	country: ICountry;
	positions: EPlayerPositionName[];
	realTeam: IRealTeamShortInfo;
	name: string;
	photo: string;
	number: number;
	age: number;
	skills: IPlayerSkills;
	rating: number;
}
