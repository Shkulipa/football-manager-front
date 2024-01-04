import { EPlayerPositionName, ICountry } from 'footballsimulationengine';
import { IPlayerSkills } from './player-skills';
import { IRealTeamFullInfo } from './real-team-full-info';

interface IRealTeam
	extends Pick<IRealTeamFullInfo, '_id' | 'logoClub' | 'clubName'> {}

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
	realTeam?: IRealTeam;
}
