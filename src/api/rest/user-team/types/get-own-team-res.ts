import { ISkillsAttrs } from '@/types/football-simulator/skills.types';
import { ISignInRes } from '../../auth/types/sign-in-res';
import { IRealPlayerNotMain } from '@/types/football-simulator/real-team-full-info';
import { TSquadMain } from '@/types/football-simulator/user-team';

interface IUser extends Pick<ISignInRes, '_id' | 'username'> {}

export interface IGetOwnTeamRes {
	bench: IRealPlayerNotMain[];
	clubName: string;
	logoClub: string;
	main: null | TSquadMain;
	ratingElo: number;
	reserve: IRealPlayerNotMain[];
	skills: ISkillsAttrs;
	user: IUser;
	_id: string;
}
