import { IRealPlayer } from '@/types/football-simulator/real-player';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

export interface IOpenPackReq {
	pack: 'bronze' | 'silver' | 'gold';
}

export interface IPlayer extends IRealPlayer {
	realTeam: Pick<IRealTeamFullInfo, '_id' | 'clubName' | 'logoClub'>;
}

export interface IOpenPackRes {
	players: IPlayer[];
	money: number;
}
