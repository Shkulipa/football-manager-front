export interface IBall {
	position: number[];
	withPlayer: boolean;
	Player: string;
	withTeam: string;
	direction: string;
	ballOverIterations: number[][];
	lastTouch: ILastTouch;
}

export interface ILastTouch {
	playerName: string;
	playerID: number;
	teamID: number;
}
