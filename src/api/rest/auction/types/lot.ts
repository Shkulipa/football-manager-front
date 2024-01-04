import { IRealPlayer } from '@/types/football-simulator/real-player';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

export interface ILotPlayer extends IRealPlayer {
	realTeam: Pick<IRealTeamFullInfo, '_id' | 'clubName' | 'logoClub'>;
}

export interface ILot {
	createdAt: string;
	player: ILotPlayer;
	price: number;
	userId: string;
	_id: string;
}
