declare module 'footballsimulationengine' {
	export interface IPitchSize {
		pitchWidth: number;
		pitchHeight: number;
		goalWidth: number;
	}

	export interface ITeam {
		name: string;
		manager: string;
		players: IPlayer[];
		rating: number;
		intent: string;
		teamID: number;
		logoClub: string;
	}

	export interface IMatchDetails {
		matchID: number;
		kickOffTeam: ITeam;
		secondTeam: ITeam;
		pitchSize: number[];
		ball: IBall;
		half: number;
		kickOffTeamStatistics: ITeamStatistics;
		secondTeamStatistics: ITeamStatistics;
		iterationLog: string[];
	}

	export interface IPlayer {
		realPlayerId: string;
		name: string;
		rating: number;
		position: string;
		skill: IPlayerSkills;
		currentPOS: number[];
		fitness: number;
		injured: boolean;
		playerID: number;
		originPOS: number[];
		intentPOS: number[];
		action: string;
		offside: boolean;
		hasBall: boolean;
		stats: IStats;
		number: number;
	}

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

	export type IPlayerParse = Pick<
		IPlayer,
		| 'realPlayerId'
		| 'name'
		| 'rating'
		| 'position'
		| 'skill'
		| 'currentPOS'
		| 'fitness'
		| 'injured'
	>;

	export interface IStats {
		goals: number;
		shots: IShots;
		cards: ICards;
		passes: IPasses;
		tackles: ITackles;
	}

	export interface IShots {
		total: number;
		on: number;
		off: number;
	}

	export interface ICards {
		yellow: number;
		red: number;
	}

	export interface IPasses {
		total: number;
		on: number;
		off: number;
	}

	export interface ITackles {
		total: number;
		on: number;
		off: number;
		fouls: number;
	}

	export interface ITeamStatistics {
		goals: number;
		shots: IShots;
		corners: number;
		freekicks: number;
		penalties: number;
		fouls: number;
	}

	export enum ENameTeams {
		KICK_OFF_TEAM = 'kickOffTeam',
		SECOND_TEAM = 'secondTeam'
	}

	export function initiateGame(
		guestTeam: string,
		hostTeam: number,
		pitchSize: IPitchSize
	): Promise<IMatchDetails>;

	export function playIteration(
		matchDetails: IMatchDetails
	): Promise<IMatchDetails>;

	export function startSecondHalf(
		matchDetails: IMatchDetails
	): Promise<IMatchDetails>;
}
