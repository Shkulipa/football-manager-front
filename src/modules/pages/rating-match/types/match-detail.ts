import { ISignInRes } from '@/api/rest/auth/types/sign-in-res';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';
import { ITeamStatistics } from 'footballsimulationengine';
import { IMatchReward } from './match-reward';

export enum EStatusMatch {
	PREPARE = 'PREPARE',
	IN_PROCESS = 'IN_PROCESS',
	FINISHED = 'FINISHED'
}

export interface IReplacements {
	on: string;
	off: string;
}

export interface IUserData
	extends Pick<ISignInRes, '_id' | 'roles' | 'username' | 'email'> {}

export interface ITeam
	extends Pick<IRealTeamFullInfo, '_id' | 'clubName' | 'logoClub'> {
	bench: string[];
	main: Record<Partial<EPlayerPositionName>, string>;
}

export interface IPlayerData {
	isReady: boolean;
	replacements: IReplacements[];
	isNeedUpdateSquad: boolean;
	team: ITeam;
	user: IUserData;
}

export interface IJoinDetails {
	player1: IPlayerData;
	player2: IPlayerData;
	status: EStatusMatch;
	statistics?: {
		host: ITeamStatistics;
		guests: ITeamStatistics;
	};
	reward?: IMatchReward;
}
