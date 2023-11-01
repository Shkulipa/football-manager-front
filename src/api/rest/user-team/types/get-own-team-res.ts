import { ISkillsAttrs } from '@/types/primary/skills.types';
import { ISignInRes } from '../../auth/types/sign-in-res';
import { IRealPlayerNotMain } from '@/types/primary/real-team-full-info';
import { TSquadMain } from '@/types/primary/user-team';

interface IUser extends Pick<ISignInRes, '_id' | 'username'> {}

export interface IGetOwnTeamRes {
	bench: string[];
	clubName: string;
	logoClub: string;
	main: null | TSquadMain;
	ratingElo: number;
	reserve: IRealPlayerNotMain[];
	skills: ISkillsAttrs;
	user: IUser;
	_id: string;
}
