declare module 'footballsimulationengine' {
	export interface IPitchSize {
		pitchWidth: number;
		pitchHeight: number;
		goalWidth: number;
	}

	export interface IReplacement {
		on: string;
		off: string;
	}
	export interface ITeam {
		bench: IRealPlayerNotMain[];
		name: string;
		manager: string;
		players: IPlayer[];
		rating: number;
		intent: string;
		teamID: number;
		logoClub?: string;
		replacements: IReplacement[];
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

	export enum EPlayerPositionName {
		// offensive
		LCF = 'LCF',
		ST = 'ST',
		RCF = 'RCF',

		// midfield
		LWM = 'LWM',
		AML = 'AML',
		AMC = 'AMC',
		AMR = 'AMR',
		RWM = 'RWM',

		LM = 'LM',
		LCM = 'LCM',
		CM = 'CM',
		RCM = 'RCM',
		RM = 'RM',

		// defensive
		LWB = 'LWB',
		LDM = 'LDM',
		CDM = 'CDM',
		RDM = 'RDM',
		RWB = 'RWB',

		LB = 'LB',
		LCB = 'LCB',
		CB = 'CB',
		RCB = 'RCB',
		RB = 'RB',

		// GK
		GK = 'GK'
	}

	export interface ICountry {
		_id: string;
		name: string;
		flag: string;
	}

	export interface IPlayer {
		_id: string;
		name: string;
		age: number;
		country: ICountry;
		rating: number;
		position: string;
		positions: EPlayerPositionName;
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
		photo?: string;
	}

	export interface IPlayerSkills {
		passing: number;
		shooting: number;
		saving: number;
		tackling: number;
		agility: number;
		strength: number;
		penalty_taking: number;
		jumping: number;
	}

	export interface IRealPlayerNotMain
		extends Pick<
			IPlayer,
			| '_id'
			| 'rating'
			| 'skill'
			| 'positions'
			| 'number'
			| 'name'
			| 'country'
			| 'age'
			| 'fitness'
			| 'injured'
		> {}

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
