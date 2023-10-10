import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { ICountry } from './country';
import { IPlayerSkills } from './player-skills';
import { IRealTeamShortInfo } from './real-team-short-info';

export interface IRealPlayer {
	_id: string;
	countryId: ICountry;
	positions: EPlayerPositionName[];
	realTeam: IRealTeamShortInfo;
	name: string;
	photo: string;
	number: number;
	age: number;
	skills: IPlayerSkills;
	rating: number;
}
