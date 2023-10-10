import { IPlayer } from './player.interface';

export interface ITeam {
	name: string;
	manager: string;
	players: IPlayer[];
	rating: number;
	intent: string;
	teamID: number;
	logoClub: string;
}
